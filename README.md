# React Starter Kit

> A minimal, flexible React template built with Vite supporting multiple rendering modes

## ✨ Features

- 🔄 **Multiple Rendering Modes**: SSR, SSG, and SPA support with route-level control
- 🚀 **File-based API Routes**: Build serverless APIs with simple file structure
- 🎯 **Framework-agnostic**: Pure React with Vite - no complex abstractions
- 🔍 **SEO Ready**: Built-in meta tags and server-side rendering for better SEO
- 📦 **Universal Deployment**: Compatible with Stormkit, Netlify, Vercel and more
- ⚡ **Hot Module Replacement**: Instant updates during development
- 🏷️ **TypeScript First**: Full TypeScript support out of the box
- 🎨 **Modern Tooling**: Vite for lightning-fast builds and development

## 🚀 Quick Start

### Installation

```bash
# Clone or use as template
git clone <repository-url>
cd react-starter

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to see your app running with HMR enabled.

## 📁 Project Structure

```
src/
├── api/                 # API routes (serverless functions)
│   └── hello.ts        # Example API endpoint
├── pages/              # Application pages
│   ├── home.tsx        # Home page (SPA)
│   ├── about.tsx       # About page (SPA)
│   └── ssr.tsx         # SSR example with fetchData
├── components/         # Reusable components
├── context.ts          # React context for data sharing
├── entry-client.tsx    # Client-side entry point
├── entry-server.tsx    # Server-side entry point
├── prerender.ts        # SSG route configuration
└── App.tsx            # Main application component
```

## 🔧 Build Commands

### Development Server

```bash
npm run dev
```

Starts development server with HMR at `http://localhost:5173`

### Single Page Application (SPA)

```bash
npm run build:spa
```

Builds a traditional SPA. Output: `.stormkit/public/`

### Server-Side Rendering (SSR)

```bash
npm run build:ssr
```

Builds for serverless deployment with SSR. Output: `.stormkit/server/`

### Static Site Generation (SSG)

```bash
npm run build:spa  # Build SPA first
npm run build:ssg  # Generate static pages
```

Pre-renders specified routes at build time. Output: `.stormkit/public/`

### API Only

```bash
npm run build:api
```

Builds only the API functions. Output: `.stormkit/api/`

## 🎯 Rendering Modes

### Single Page Application (Default)

All routes are client-side rendered by default:

```tsx
// src/pages/home.tsx
export default function Home() {
  return <h1>Welcome to Home</h1>;
}
```

### Server-Side Rendering

Add a `fetchData` export to enable SSR:

```tsx
import { useContext } from "react";
import Context from "~/context";

// src/pages/ssr.tsx
export async function fetchData() {
  const data = await fetch("https://api.example.com/data");
  return {
    head: {
        // meta tags
    },
    context: {
        myParam: data.myParam;
    }
  };
}

export default function SSRPage({ data }: { data: any }) {
  const context = useContext(Context);
  return <h1>Server-rendered: {data.myParam}</h1>;
}
```

### Static Site Generation

Configure routes to pre-render in `src/prerender.ts`:

```tsx
// src/prerender.ts

// Export an array of paths to be prerendered.
export default ["/", "/about", "/blog/post-1"];
```

## 🔌 API Routes

Create API endpoints by adding files to `src/api/`:

```typescript
// src/api/hello.ts
export default async (req: http.IncomingMessage, res: http.ServerResponse) => {
  res.setHeader("Content-Type", "application/json");
  res.writeHead(200, "Success");
  res.write(
    JSON.stringify({
      payload:
        "This is an API function - can be deployed as a serverless function!",
    })
  );
  res.end();
};
```

Access at: `http://localhost:5173/api/hello`

## 🚀 Deployment

### Stormkit

Import this application on Stormkit (either self-hosted or cloud) and simply click deploy. It works with zero-config.

### Static Hosting

```bash
npm run build:spa
npm run build:ssg  # Optional: for pre-rendered pages
```

Deploy the `.stormkit/public` folder.

## 🔧 Configuration

### Vite Configuration

- `vite.config.ts` - Development server
- `vite.config.ssr.ts` - SSR build
- `vite.config.spa.ts` - SPA build
- `vite.config.api.ts` - API build

## 🛠️ Advanced Usage

### Custom Server

```typescript
// server.ts
import { handler } from "./.stormkit/server/server.mjs";

const server = express();
server.use(handler);
server.listen(3000);
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📚 Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Stormkit Documentation](https://stormkit.io/docs)

## 🌟 Showcase

Websites built with this template:

| Site                                                     | Description                       | Features Used   |
| -------------------------------------------------------- | --------------------------------- | --------------- |
| [Stormkit.io](https://stormkit.io)                       | Deploy full-stack JavaScript apps | SSR, API Routes |
| [Add your site](https://github.com/your-repo/issues/new) | Submit your project               | -               |

## 📄 License

MIT ©
