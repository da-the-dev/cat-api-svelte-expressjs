import { Cat } from '../interfaces/cat'
export async function addCat(cat: Cat) {
    console.log('sending')
    const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cat),
    }

    const res = await fetch('/apiv1/addcat', req)
    return res
}

export async function getCats() {
    const res = await fetch('/apiv1/cats')
    return await res.json()
}

export async function deleteCat(id) {
    const res = await fetch(`/apiv1/deleteCat/${id}`, { method: 'DELETE' })
    return res.status
}
