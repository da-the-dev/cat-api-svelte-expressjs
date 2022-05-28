<script lang="ts">
  import { Cat } from '../../interfaces/cat'
  import Input from './Input.svelte'

  export let cat: Cat

  let editMenuEnabled = false
  let isEditing = false
  let hasEditingChanges = false

  function editCat(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    let json = Object.fromEntries(formData.entries())
    cat.name = json.catName.toString()
    cat.age = parseInt(json.catAge.toString())
    isEditing = false
    editMenuEnabled = false
  }
</script>

<div class="card" on:mouseleave="{() => (editMenuEnabled = false)}">
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
      id="edit"
      on:click="{() => (!hasEditingChanges ? (isEditing = !isEditing) : null)}"
      >Edit</button
    >
    <button id="delete" on:click="{() => {}}">Delete</button>
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
    border: none;
    width: 4rem;
    padding: 0.5rem;
    margin: 0;
    margin-bottom: 15%;
    border-radius: 0.5rem;
    font-weight: 700;

    transition-duration: 0.1s;
    transition-timing-function: cubic-bezier(0.445, 0.05, 0.55, 0.95);
    user-select: none;
  }
  .editMenu button:hover {
    cursor: pointer;
    transform: scale(1.1, 1.1);
    box-shadow: 0.15rem 0.15rem 0 0.15rem lightgrey;
    border: none;
  }
  .editMenu button:active {
    border: none;
    transition-duration: 0;
    transform: translate(0.15rem, 0.15rem) scale(1.1, 1.1);
    box-shadow: 0.1rem 0.1rem 0 0.1rem lightgrey;
  }
  .editMenu button:focus {
    background-color: red;
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
