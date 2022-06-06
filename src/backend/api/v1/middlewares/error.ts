import { NextFunction, Request, Response } from 'express'
import { isStatusError, StatusError } from '../modules/statusError'
export function handleError(
    err: Error | StatusError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    let newErr = err as StatusError

    if (!isStatusError(err)) newErr = new StatusError(500, err.message)

    res.status(newErr.status).send({ ...newErr })
}
