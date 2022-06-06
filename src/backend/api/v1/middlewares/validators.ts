import { body } from 'express-validator'

export const catValidator =
    body('name').isString().isLength({ min: 3, max: 6 }) &&
    body('age').isInt({ gt: 0, lt: 100 })
