import { NextFunction, Request, Response } from "express";

import renderBundle from "./render-bundle";

export const render = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  res.renderBundle = () => {
    const str = renderBundle();

    res.send(str);
  };

  next();
};
