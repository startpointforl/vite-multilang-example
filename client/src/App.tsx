import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import React from "react";
import "./App.css";
import { SimpleComponent } from "./components/SimpleComponent";
import { i18n } from "./utils/i18n";

const LazyComponent = React.lazy(() => import("./components/LazyComponent"));

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React hello!</h1>
      <LazyComponent />
      <SimpleComponent />
      <p className="read-the-docs">
        {i18n({ keyset: "block", key: "fetch-error" })}
      </p>
    </>
  );
}

export default App;
