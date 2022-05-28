<script lang="ts">
  import { form, field } from 'svelte-forms'
  import { required, min, max } from 'svelte-forms/validators'
  import { Cat } from '../../interfaces/cat'
  import { addCat } from '../../modules/apiController'
  import { isName } from '../../modules/formTools'

  export let cat: Cat[]
  let visible = false
  let editing = false
  let x: number, y: number
  export function show(e) {
    visible = !visible
    x = e.clientX
    y = e.clientY
  }

  const fieldCfg = {
    validateOnChange: false,
    stopAtFirstError: true,
  }
  const catName = field(
    'catName',
    '',
    [required(), min(3), max(6), isName()],
    fieldCfg
  )
  const catAge = field('catAge', '', [required(), min(1), max(100)], fieldCfg)
  const catForm = form(catName, catAge)

  async function handleSubmit() {
    await catForm.validate()
    console.log($catForm.errors)
    if (!$catForm.valid) return

    visible = false
    editing = false
    const res = await addCat({
      name: $catName.value,
      age: parseInt($catAge.value),
    })
    // Can't "push", variable must be updated via reassigning
    cat = cat.concat(await res.json())
  }
</script>

<div
  style="z-index: 100000;position: fixed;"
  style:display="{visible ? 'block' : 'none'}"
  style:top="{y - 20}px"
  style:left="{x - 50}px"
  on:mouseleave="{() => {
    visible = false
    editing = false
  }}"
>
  {#if !editing}
    <div id="catAddMenu">
      <button class="btn" on:click="{() => (editing = true)}">Add Cat</button>
    </div>
  {/if}

  {#if editing}
    <!-- svelte-ignore component-name-lowercase -->
    <form
      style:top="{y - 50}px"
      style:left="{x - 125}px"
      on:submit|preventDefault="{handleSubmit}"
    >
      <div>
        <label for="catName">Cat's name</label>
        <input
          bind:value="{$catName.value}"
          type="text"
          name="catName"
          id="catName"
          autocomplete="off"
        />
      </div>
      {#if $catForm.hasError('catName.isName')}
        <p>Cat's name must valid</p>{/if}
      {#if $catForm.hasError('catName.required')}
        <p>Cat's name is required</p>{/if}
      {#if $catForm.hasError('catName.min')}
        <p>Cat's name must be longer than 3 characters</p>{/if}
      {#if $catForm.hasError('catName.max')}
        <p>Cat's name must be shorter than 6 characters</p>{/if}

      <div>
        <label for="catAge">Age</label>
        <input
          bind:value="{$catAge.value}"
          type="number"
          name="catAge"
          id="catAge"
          autocomplete="off"
        />
      </div>
      {#if $catForm.hasError('catAge.required')}
        <p>Cat's age is required</p>{/if}
      {#if $catForm.hasError('catAge.min')}
        <p>Cat's age must be more than 0</p>{/if}
      {#if $catForm.hasError('catAge.max')}
        <p>Cat's age must less than 100</p>{/if}

      <button class="btn" type="submit">Create a new cat</button>
    </form>
  {/if}
</div>

<style>
  form {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: aliceblue;
    margin: 0;
    padding: 1rem;
    border-radius: 1rem;
    width: 15rem;
  }

  form input {
    width: 60%;
  }
  form label {
    width: 40%;
    padding-right: 0.5rem;
    display: inline-block;
    text-align: left;
  }
  form div {
    display: flex;
    align-items: center;
    flex-direction: row;
  }
  form button {
    background: white;
    align-self: center;
  }
  form p {
    background-color: crimson;
    color: white;
    margin: 0;
    margin-bottom: 0.5rem;
    padding: 0.25rem;
    border-radius: 0.5rem;
  }

  #catAddMenu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    padding: 0.5rem;
    margin: 0;
    /* background-color: white; */

    width: 5rem;
  }

  #catAddMenu button {
    background-color: whitesmoke;
  }
</style>
