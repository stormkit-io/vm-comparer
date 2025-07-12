import { fileURLToPath } from "node:url";
import path from "node:path";
import * as glob from "glob";
import dotenv from "dotenv";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { build } from "vite";

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const files = glob
  .sync("src/api/**/*.ts")
  // Filter out private files
  .filter((file) => {
    return file.indexOf("_") !== 0 && file.indexOf("/_") === -1;
  })
  .map((file: string) => ({
    entry: `./${file}`,
    distFileName: file.replace("src/api/", "").replace(".ts", ""),
  }));

(async () => {
  for (const file of files) {
    await build({
      configFile: false,
      resolve: {
        alias: [
          {
            find: /^~/,
            replacement: path.resolve(__dirname, "src"),
          },
        ],
        extensions: [".ts", ".tsx"],
      },
      define: {
        ...Object.keys(process.env).reduce(
          (obj: Record<string, string>, key: string) => {
            key = key.replace(/-/g, "_").toUpperCase();
            obj[`process.env.${key}`] = JSON.stringify(process.env[key]);
            return obj;
          },
          {}
        ),
      },
      build: {
        ssr: true,
        emptyOutDir: false,
        copyPublicDir: false,
        rollupOptions: {
          input: {
            [file.distFileName]: file.entry,
          },
          output: {
            dir: ".stormkit/api",
            format: "esm",
            manualChunks: () => "",
          },
        },
        minify: false,
      },
      plugins: [
        viteStaticCopy({
          targets: [
            {
              src: path.join(__dirname, "src/api/package.json"),
              dest: path.join(__dirname, ".stormkit", "api"),
            },
          ],
        }),
      ],
    });
  }
})();
