import { WithId, Document } from 'mongodb'
import { Cat } from '../../interfaces/cat'
export interface DBCat extends Cat, WithId<Document> {}
