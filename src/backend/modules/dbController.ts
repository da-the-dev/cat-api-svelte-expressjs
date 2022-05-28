import { MongoClient } from "mongodb"
export default class DBController {
    static created = false
    static instance: DBController
    connected: boolean
    client: MongoClient
    constructor() {
        this.connected = false
    }

    getInstance() {
        if (!DBController.created) DBController.instance = new DBController()
        return DBController.instance
    }

    /** Connet to DB */
    private con() {
        if (!this.connected)
            this.client = new MongoClient(process.env.MONGODBURI)
    }
    /** Disconnect from DB */
    dis() {
        if (this.connected) this.client.close()
        else
            throw new SyntaxError(
                "Tried to open MongoDB connection before one was opened!"
            )
    }

    /** Get the main collection */
    col() {
        this.con()
        return this.client.db("catAPItest").collection("cats")
    }
}
