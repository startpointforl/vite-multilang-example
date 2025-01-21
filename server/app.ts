import express from "express";

import { render } from "./render";
import path from "path";
import { IS_PROD } from "./env";

const app = express();

const staticPath = path.join(__dirname, "../client");

if (IS_PROD) {
  app.use(express.static(staticPath));
}

app
  .disable("x-powered-by")
  .enable("trust proxy")
  .use(render)
  .get("/api", (_req, res) => {
    res.send("Hello World!");
  })
  .get("/", (_req, res) => {
    // @ts-ignore
    res.renderBundle();
  });

export default app;
