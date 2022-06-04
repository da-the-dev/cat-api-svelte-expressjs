<script lang="ts">
  import { field, form } from 'svelte-forms'
  import { max, min, required } from 'svelte-forms/validators'
  import { Cat } from '../../interfaces/cat'
  import { deleteCat, editCat } from '../../modules/apiController'
  import { isName } from '../../modules/formTools'
  import { cats } from '../../stores/cats'

  // Card data and states
  export let cat: Cat
  export let dbId: number
  let editMenuEnabled = false
  let isEditing = false
  let hasEditingChanges = false

  // Form init
  const fieldCfg = {
    validateOnChange: true,
    stopAtFirstError: true,
    checkOnInit: false,
  }
  const catName = field(
    'catName',
    cat.name,
    [required(), min(3), max(6), isName()],
    fieldCfg
  )
  const catAge = field(
    'catAge',
    cat.age,
    [required(), min(1), max(100)],
    fieldCfg
  )
  const editForm = form(catName, catAge)

  /** Edits the cat and disables all menus*/
  async function handleEdit() {
    await editForm.validate()

    if (!$editForm.valid) return

    const res = await editCat(dbId, {
      name: $catName.value,
      age: $catAge.value,
    })
    if (res.status == 500) {
      console.log('Error when editing the cat', res.body)
      return
    }

    cat.age = $catAge.value
    cat.name = $catName.value

    $cats[$cats.findIndex((c) => c._id == dbId)] = {
      _id: dbId,
      ...cat,
    }

    isEditing = false
    editMenuEnabled = false
  }

  /** Deletes a cat and disables all menus*/
  async function handleDelete() {
    const res = await deleteCat(dbId)
    if (res.status === 500) return

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
      <!-- svelte-ignore component-name-lowercase -->
      <form on:submit|preventDefault="{handleEdit}">
        <input bind:value="{$catName.value}" class="catName" type="text" />
        <input bind:value="{$catAge.value}" type="number" />
        <button style="display:none" type="submit">submit</button>

        {#if $editForm.hasError('catName.isName')}
          <p>Cat's name must valid</p>{/if}
        {#if $editForm.hasError('catName.required')}
          <p>Cat's name is required</p>{/if}
        {#if $editForm.hasError('catName.min')}
          <p>Cat's name must be longer than 3 characters</p>{/if}
        {#if $editForm.hasError('catName.max')}
          <p>Cat's name must be shorter than 6 characters</p>{/if}

        {#if $editForm.hasError('catAge.required')}
          <p>Cat's age is required</p>{/if}
        {#if $editForm.hasError('catAge.min')}
          <p>Cat's age must be more than 0</p>{/if}
        {#if $editForm.hasError('catAge.max')}
          <p>Cat's age must less than 100</p>{/if}
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

  input {
    /* margin: 0; */
    padding: 0;
    padding-bottom: 1rem;
    text-align: center;
    max-width: 8rem;
    border: 0;
    color: darkgrey;
  }

  form p {
    background-color: crimson;
    color: white;
    margin: 0;
    margin-bottom: 0.5rem;
    padding: 0.25rem;
    border-radius: 0.5rem;
  }
</style>
