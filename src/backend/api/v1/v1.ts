// API V1

import { Router } from 'express'
import { validationResult } from 'express-validator'
import DBController from './controllers/db'
import { DBCat } from './interfaces/cat'
import { ObjectId } from 'mongodb'
import { catValidator } from './middlewares/validators'
import { StatusError } from './modules/statusError'
import { handleError } from './middlewares/error'
const api = Router()

api.use(handleError)

// Adds a cat to DB. Validates incoming data before doing so
api.post('/addCat', catValidator, async (req, res) => {
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty())
        return res.status(400).json({ errors: validationErrors.array() })

    try {
        const db = DBController.getInstance()
        const col = await db.col()
        const doc = await col.insertOne(req.body as DBCat)

        res.status(201).send({
            _id: doc.insertedId,
            ...req.body,
        })
    } catch (e) {
        res.status(502).send(e)
    }
})

// Returns all cats in DB
api.get('/cats', async (req, res) => {
    const db = DBController.getInstance()
    const col = await db.col()
    try {
        res.status(200).send((await col.find().toArray()) as DBCat[])
    } catch (e) {
        res.status(502).send(e)
    }
})

// Edits a cat. Does validation of incoming data
api.patch('/editCat/:id', catValidator, async (req, res) => {
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty())
        return res.status(400).json({ errors: validationErrors.array() })

    const db = DBController.getInstance()
    const col = await db.col()
    try {
        await col.replaceOne({ _id: new ObjectId(req.params!.id!) }, req.body)
        res.status(201).send(req.body)
    } catch (e) {
        res.status(502).send(e)
    }
})

// Deletes a cat in DB
api.delete('/deleteCat/:id', async (req, res, next) => {
    const db = DBController.getInstance()
    const col = await db.col()
    try {
        const doc = await col.findOne({ _id: new ObjectId(req.params.id) })
        if (!doc)
            next(
                new StatusError(
                    400,
                    `Object with ID '${req.params.id}' doesn't exist.`
                )
            )
        await col.deleteOne({ _id: new ObjectId(req.params.id) })
        res.status(204).send(req.body)
    } catch (e: any) {
        next(new StatusError(502, e))
    }
})

export default api
