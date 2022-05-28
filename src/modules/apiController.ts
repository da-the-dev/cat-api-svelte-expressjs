import { Cat } from '../interfaces/cat'
export async function addCat(cat: Cat) {
    const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cat),
    }

    const res = await fetch('/apiv1/addcat', req)
    return res
}
