import express, { Router } from "express"
import cors from "cors"
import path from "path"
const app = express()

app.use(cors())
app.use(express.static("public"))

const apiv1 = Router()

apiv1.get("/addcat", (req, res) => {
  console.log(req)
})

app.use("/apiv1", apiv1)

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"))
})

app.listen(3000, () => {})
