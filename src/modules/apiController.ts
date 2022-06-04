import { Cat, DBCat } from '../interfaces/cat'

/** Send a request with new cat data
 * @param cat - Cat data
 */
export async function addCat(cat: Cat) {
    const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cat),
    }

    const res = await fetch('/apiv1/addCat', req)
    return res
}

/** Sends a get request and returns all cats in database */
export async function getCats(): Promise<DBCat[]> {
    const res = await fetch('/apiv1/cats')
    return await res.json()
}

/**
 * Sends a delete request
 * @param id
 */
export async function deleteCat(id) {
    const res = await fetch(`/apiv1/deleteCat/${id}`, { method: 'DELETE' })
    return res
}

/** Sends an edit request
 * @param id - MongoDB ID
 * @param newCat - New cat data
 */
export async function editCat(id: number, newCat: Cat) {
    const res = await fetch(`/apiv1/editCat/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCat),
    })
    return res
}
