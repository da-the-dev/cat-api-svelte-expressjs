import express, { Router } from 'express'
import cors from 'cors'
import path from 'path'
import bodyParser from 'body-parser'
import apiv1 from './api/v1'

import * as dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('public'))

app.use('/apiv1', apiv1)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(3000, () => {
    console.log('Ready')
})
