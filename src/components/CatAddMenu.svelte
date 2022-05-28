<script lang="ts">
  let visible = false
  let editing = false
  let x: number, y: number
  export function show(e) {
    visible = !visible
    x = e.clientX
    y = e.clientY
  }

  import { form, field } from 'svelte-forms'
  import { required, min, max } from 'svelte-forms/validators'
  import { addCat } from '../modules/apiController'

  const fieldCfg = {
    validateOnChange: true,
    stopAtFirstError: true,
  }
  const catName = field(
    'catName',
    '',
    [
      required(),
      min(3),
      max(6),
      (val) => {
        return { valid: typeof val === 'string', name: 'isString' }
      },
    ],
    fieldCfg
  )
  const catAge = field('catAge', '', [required(), min(1), max(100)], fieldCfg)
  const catForm = form(catName, catAge)

  async function handleSubmit() {
    // console.log($catForm.summary)
    catForm.validate()
    if (!$catForm.valid) return

    const res = await addCat({
      name: $catName.value,
      age: parseInt($catAge.value),
    })

    console.log(await res.json())
  }
</script>

<div
  style="z-index: 100000;position: fixed;"
  style:display="{visible ? 'block' : 'none'}"
  style:top="{y - 10}px"
  style:left="{x - 10}px"
  on:mouseleave="{() => {
    visible = false
    editing = false
    catForm.reset()
  }}"
>
  {#if !editing}
    <div id="catAddMenu">
      <button class="btn" on:click="{() => (editing = true)}">Add Cat</button>
    </div>
  {/if}

  {#if editing}
    <!-- svelte-ignore component-name-lowercase -->
    <form on:submit|preventDefault="{handleSubmit}">
      <div>
        <label for="catName">Cat's name</label>
        <input
          bind:value="{$catName.value}"
          type="text"
          name="catName"
          id="catName"
        />
      </div>
      {#if $catForm.hasError('catName.required')}
        <p>Cat's name is required</p>
      {/if}
      <div>
        <label for="catAge">Age</label>
        <input
          bind:value="{$catAge.value}"
          type="number"
          name="catAge"
          id="catAge"
        />
      </div>
      {#if $catForm.hasError('catAge.required')}
        <p>Cat's age is required</p>
      {/if}
      <button class="btn" type="submit">Create a new cat</button>
    </form>
  {/if}
</div>

<style>
  form {
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
    background-color: white;

    width: 5rem;
  }

  #catAddMenu button {
    background-color: whitesmoke;
  }
</style>
