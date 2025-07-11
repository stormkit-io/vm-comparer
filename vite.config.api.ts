import { fileURLToPath } from "node:url";
import path from "node:path";
import * as glob from "glob";
import dotenv from "dotenv";
import react from "@vitejs/plugin-react";
import { build, defineConfig } from "vite";

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const files = glob
  .sync("src/api/**/*.ts")
  // Filter out private files
  .filter((file) => {
    return file.indexOf("_") !== 0 && file.indexOf("/_") === -1;
  });
console.log(files);

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: path.resolve(__dirname, "src"),
      },
    ],
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
  },
  build: {
    ssr: true,
    minify: false,
    rollupOptions: {
      preserveEntrySignatures: "strict",
      input: files,
      output: {
        dir: ".stormkit/api",
        format: "esm",
        entryFileNames: "[name].mjs",
        preserveModules: true,
        preserveModulesRoot: "src",
        exports: "named",
      },
    },
  },
  define: {
    ...Object.keys(process.env).reduce(
      (obj: Record<string, string>, key: string) => {
        obj[`process.env.${key}`] = JSON.stringify(process.env[key]);
        return obj;
      },
      {}
    ),
  },
  plugins: [react()],
});

// (async () => {
//   for (const file of files) {
//     await build({
//       ssr: true,
//       configFile: false,
//       resolve: {
//         alias: [
//           {
//             find: /^~/,
//             replacement: path.resolve(__dirname, "src"),
//           },
//         ],
//         extensions: [".ts", ".tsx"],
//       },
//       define: {
//         ...Object.keys(process.env).reduce(
//           (obj: Record<string, string>, key: string) => {
//             obj[`process.env.${key}`] = JSON.stringify(process.env[key]);
//             return obj;
//           },
//           {}
//         ),
//       },
//       build: {
//         ssr: true,
//         emptyOutDir: false,
//         copyPublicDir: false,
//         rollupOptions: {
//           input: {
//             [file.distFileName]: file.entry,
//           },
//           output: {
//             dir: ".stormkit/api",
//             format: "commonjs",
//             manualChunks: () => "",
//           },
//         },
//         minify: false,
//       },
//     });
//   }
// })();
