import { MongoClient } from 'mongodb'
export default class DBController {
    static created = false
    static instance: DBController
    connected: boolean
    client: MongoClient
    constructor() {
        this.connected = false
    }

    static getInstance() {
        if (!DBController.created) DBController.instance = new DBController()
        return DBController.instance
    }

    /** Connet to DB */
    private async con() {
        if (!this.connected) {
            this.client = new MongoClient(process.env.MONGODBURI!)
            await this.client.connect()
        }
    }
    /** Disconnect from DB */
    dis() {
        if (this.connected) this.client.close()
        else
            throw new SyntaxError(
                'Tried to open MongoDB connection before one was opened!'
            )
    }

    /** Get the main collection */
    async col() {
        await this.con()
        return this.client.db('catAPItest').collection('cats')
    }
}
