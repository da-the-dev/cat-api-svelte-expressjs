<script lang="ts">
  import { onDestroy } from 'svelte'

  import { Cat, DBCat } from '../../interfaces/cat'
  import { deleteCat } from '../../modules/apiController'
  import { cats } from '../../stores/cats'
  import Input from './Input.svelte'

  // Card data and states
  export let cat: Cat
  export let dbId: number
  let editMenuEnabled = false
  let isEditing = false
  let hasEditingChanges = false

  /** Editing cat    
  TODO: Rework forms */
  function editCat(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    let json = Object.fromEntries(formData.entries())
    cat.name = json.catName.toString()
    cat.age = parseInt(json.catAge.toString())
    isEditing = false
    editMenuEnabled = false
  }

  /** Deletes a cat and disables all menus*/
  async function handleDelete() {
    const res = await deleteCat(dbId)
    if (res === 500) return

    $cats.splice(
      $cats.findIndex((c) => c._id === dbId),
      1
    )
    // Update cats
    $cats = $cats

    editMenuEnabled = false
    isEditing = false
    hasEditingChanges = false
  }
</script>

<div
  class="card"
  on:mouseleave="{() => {
    editMenuEnabled = false
    isEditing = false
    hasEditingChanges = false
  }}"
>
  <div
    class="catData"
    class:menuActive="{editMenuEnabled}"
    on:click="{() =>
      !isEditing ? (editMenuEnabled = !editMenuEnabled) : null}"
  >
    {#if !isEditing}
      <h1>{cat.name}</h1>
      <p>Age: {cat.age}</p>
    {/if}
    {#if isEditing}
      <form on:submit="{editCat}">
        <Input class="catName" value="{cat.name}" name="catName" type="text" />
        <Input value="{cat.age}" name="catAge" type="number" />
        <button style="display: none">Submit</button>
      </form>
    {/if}
  </div>

  <div class="editMenu" class:hidden="{!editMenuEnabled}">
    <button
      class="btn"
      id="edit"
      on:click="{() => (!hasEditingChanges ? (isEditing = !isEditing) : null)}"
      >Edit</button
    >
    <button class="btn" id="delete" on:click="{handleDelete}">Delete</button>
  </div>
</div>

<style>
  .card {
    display: flex;
  }

  .editMenu {
    margin: 1rem;
    margin-left: 0;
    display: flex;
    flex-direction: column;
  }
  .editMenu.hidden {
    display: none;
  }
  .editMenu button {
    margin-bottom: 15%;
  }

  .editMenu button#edit {
    background-color: orange;
    color: white;
  }
  .editMenu button#delete {
    background-color: red;
    color: white;
  }

  .catData {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;

    margin: 1rem;
    padding: 1rem;

    border: 1px solid grey;
    border-radius: 0.5rem;
    width: 7rem;
    height: 7rem;
  }
  .catData.menuActive {
    margin-right: 0.5rem;
  }
  .catData h1 {
    margin: 0;
    margin-bottom: 1rem;
  }

  .catData :global(.catName) {
    font-size: 24pt;
    font-weight: 700;
    margin-bottom: 1rem;
  }
</style>
