import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import reactLogo from "~/assets/react.svg";
import Context from "~/context";

export default function Home() {
  const context = useContext(Context);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/logo.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="list">
        <p>This page is prerendered.</p>
        <p>
          Context generated on the server-side:
          <br /> <code>{JSON.stringify(context)}</code>
        </p>
        <p>
          Go back to <Link to="/">home page</Link>.
        </p>
      </div>
      <p className="powered-by">
        Template by{" "}
        <a
          href="https://www.stormkit.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/stormkit-logo.svg" />
        </a>
      </p>
    </div>
  );
}
