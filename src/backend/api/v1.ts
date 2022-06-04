// API V1

import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import DBController from '../modules/dbController'
import { DBCat } from '../intefaces/cat'
import { ObjectId } from 'mongodb'
const api = Router()

// Adds a cat to DB. Validates incoming data before doing so
api.post(
    '/addCat',
    body('name').isString().isLength({ min: 3, max: 6 }),
    body('age').isInt({ gt: 0, lt: 100 }),
    async (req, res) => {
        const validationErrrors = validationResult(req)
        if (!validationErrrors.isEmpty())
            return res.status(400).json({ errors: validationErrrors.array() })

        try {
            const db = DBController.getInstance()
            const col = await db.col()
            const doc = await col.insertOne(req.body as DBCat)

            res.status(200).send({
                _id: doc.insertedId,
                ...req.body,
            })
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }
)

// Returns all cats in DB
api.get('/cats', async (req, res) => {
    const db = DBController.getInstance()
    const col = await db.col()
    try {
        res.status(200).send((await col.find().toArray()) as DBCat[])
    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
})

// Edits a cat. Does validation of incoming data
api.patch(
    '/editCat/:id',
    body('name').isString().isLength({ min: 3, max: 6 }),
    body('age').isInt({ gt: 0, lt: 100 }),
    async (req, res) => {
        const validationErrrors = validationResult(req)
        if (!validationErrrors.isEmpty())
            return res.status(400).json({ errors: validationErrrors.array() })

        const db = DBController.getInstance()
        const col = await db.col()
        try {
            await col.replaceOne(
                { _id: new ObjectId(req.params!.id!) },
                req.body
            )
            res.status(200).send(req.body)
        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }
)

// Deletes a cat in DB
api.delete('/deleteCat/:id', async (req, res) => {
    const db = DBController.getInstance()
    const col = await db.col()
    try {
        await col.deleteOne({ _id: new ObjectId(req.params.id) })
        res.status(200).send(req.body)
    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
})

export default api
