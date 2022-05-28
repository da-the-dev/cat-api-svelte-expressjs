import express, { Router } from 'express'
import cors from 'cors'
import path from 'path'
import bodyParser from 'body-parser'
import { body, validationResult } from 'express-validator'
const app = express()

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('public'))

const apiv1 = Router()

apiv1.post(
    '/addcat',
    body('name').isString().isLength({ max: 5 }),
    body('age').isInt({ gt: 0, lt: 100 }),
    (req, res) => {
        const validationErrrors = validationResult(req)
        if (!validationErrrors.isEmpty())
            return res.status(400).json({ errors: validationErrrors.array() })
        console.log(req.body)
        res.sendStatus(200)
    }
)

app.use('/apiv1', apiv1)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(3000, () => {})
