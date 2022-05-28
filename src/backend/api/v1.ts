// API V1

import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import DBController from '../modules/dbController'
import { DBCat } from '../intefaces/cat'
const api = Router()

api.post(
    '/addcat',
    body('name').isString().isLength({ max: 5 }),
    body('age').isInt({ gt: 0, lt: 100 }),
    async (req, res) => {
        const validationErrrors = validationResult(req)
        if (!validationErrrors.isEmpty())
            return res.status(400).json({ errors: validationErrrors.array() })
        const cat = req.body as DBCat
        const db = DBController.getInstance()
        const col = await db.col()
        console.log(await col.insertOne(cat))
    }
)

api.get('/cats', async (req, res) => {
    const db = DBController.getInstance()
    const col = await db.col()
    res.send((await col.find().toArray()) as DBCat[])
})

export default api
