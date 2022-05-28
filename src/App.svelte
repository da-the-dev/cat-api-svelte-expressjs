<script lang="ts">
  import CatGrid from './cats/CatGrid.svelte'

  import { form, field } from 'svelte-forms'
  import { required, max } from 'svelte-forms/validators'

  const name = field('name', '', [required(), max(10)])
  const myForm = form(name)
</script>

<main>
  <h1>This is The Cat API</h1>
  <h2>And this is epic</h2>

  <CatGrid />
</main>

<footer>
  <p>
    I'd like to make an announcement - Sonic the Hegdehog is a bitch ass
    motherfucker.
  </p>
  <p>Copyright OLOLOLOLO 2022</p>
</footer>

<section>
  <input type="text" bind:value="{$name.value}" />

  {#if $myForm.hasError('name.required')}
    <div>Name is required</div>
  {/if}
  {#if $myForm.hasError('name.max')}
    <div>max is required</div>
  {/if}
</section>

<style>
  main {
    padding: 1rem;
    text-align: center;

    min-height: 120%;
    margin-bottom: -100px;
    /* background: #ddd; */
  }
  h1 {
    font-size: xxx-large;
  }

  :global(html),
  :global(body) {
    padding: 0;
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    text-align: center;
    height: 100px;
    background: #eee;
  }
</style>
