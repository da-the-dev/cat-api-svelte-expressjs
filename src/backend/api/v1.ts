// API V1

import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import DBController from '../modules/dbController'
import { DBCat } from '../intefaces/cat'
import { ObjectId } from 'mongodb'
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
        res.status(200).send(req.body)
    }
)

api.get('/cats', async (req, res) => {
    const db = DBController.getInstance()
    const col = await db.col()
    res.send((await col.find().toArray()) as DBCat[])
})

api.delete('/deleteCat/:id', async (req, res) => {
    console.log(req.params.id)
    const db = DBController.getInstance()
    const col = await db.col()
    try {
        await col.deleteOne({ _id: new ObjectId(req.params.id) })
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

export default api
