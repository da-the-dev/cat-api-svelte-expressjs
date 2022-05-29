import { Writable, writable } from 'svelte/store'
import { DBCat } from '../interfaces/cat'

export const cats: Writable<DBCat[]> = writable([])
