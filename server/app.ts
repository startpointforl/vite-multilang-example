import express from "express";

import { render } from "./render";

const app = express();

app
  .disable("x-powered-by")
  .enable("trust proxy")
  .use(render)
  .get("/api", (req, res) => {
    res.send("Hello World!");
  })
  .get("*", (req, res) => {
    // @ts-ignore
    res.renderBundle();
  });

export default app;
