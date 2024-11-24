import { NextFunction, Request, Response } from 'express';
import { Query as ExpressQuery, ParamsDictionary } from 'express-serve-static-core';

type RequestHandler<Params, Body, Query> = (
  req: Request<Params, unknown, Body, Query>,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

export default function asyncHandler<Params extends ParamsDictionary, Body, Query extends ExpressQuery>(
  requestHandler: RequestHandler<Params, Body, Query>
) {
  return (req: Request<Params, unknown, Body, Query>, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
}
