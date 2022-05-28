export interface Cat {
    name: string
    age: number
}

export interface DBCat extends Cat {
    _id: number
}
