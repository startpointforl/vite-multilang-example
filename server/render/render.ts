import { NextFunction, Request, Response } from "express";

import renderBundle from "./render-bundle";

export const render = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  res.renderBundle = () => {
    const str = renderBundle(req.query.lang as string);

    res.send(str);
  };

  next();
};
