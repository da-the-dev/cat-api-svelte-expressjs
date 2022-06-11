# What is it?
This is a demo project that was made by me to understand how Svelte and Express JS work together to create a web app.

## How to use
1. Start a MongoDB server *(it's up to you, but the automation of this process is WIP)*.
2. Create a `catAPItest` database and a `cats` collection via `mongosh` or `mongo`.
3. Build with `npm run build`.
4. Run with `npm start`.
5. Go to `http://localhost:3000`.

### Interaction with the app
- Right-click to create a cat. Enter its name and age. There are limits to these values, you'll be notified if the value is invalid.
- Left-click on a cat to:
  - Edit the cat's data
  - Delete the cat's data.

### Interaction with the API
- API has all of the basic CRUD operation handlers:
  - `POST /apiv1/addCat` - provide valid cat request data in request's body to create a cat.
  - `GET /apiv1/cats` - returns all cats in DB.
  - `DELETE /apiv1/deleteCat/[id]` - provide valid ID to delete a cat.
  - `PATCH /apiv1/editCat/[id]` - provide valid ID and cat data in request's body to edit a cat. It replaces the entire entry.

## Limitations
Other users can connect and preform CRUD operations via the webapp or via the API directly. Client's local copies of cats are updated when changes happen, however, these changes aren't shared between clients. That would require implementing WebSocket connections, which is WIP.