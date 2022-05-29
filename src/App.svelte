<script lang="ts">
  import CatGrid from './components/cats/CatGrid.svelte'
  import CatAddMenu from './components/cats/CatAddMenu.svelte'
  import { cats } from './stores/cats'
  import { onMount } from 'svelte'
  import { getCats } from './modules/apiController'

  let dots = ''
  let catAddMenu: CatAddMenu

  // Cool wa
  onMount(async () => {
    $cats = await getCats()

    // Dots inteval
    setInterval(
      () =>
        (dots =
          dots.length == 3
            ? (dots = '')
            : (dots = '.'.repeat(dots.length + 1))),
      1000
    )
  })
</script>

<main on:contextmenu|preventDefault="{(e) => catAddMenu.show(e)}">
  <h1>This is The Cat API</h1>
  <h2>And this is epic</h2>

  {#if $cats.length > 0}
    <CatGrid />
  {:else}
    <h1 class="message">It all starts with a right click{dots}</h1>
  {/if}

  <CatAddMenu bind:this="{catAddMenu}" />
</main>

<footer>
  <p>
    I'd like to make an announcement - Sonic the Hegdehog is a bitch ass
    motherfucker.
  </p>
  <p>Copyright OLOLOLOLO 2022</p>
</footer>

<style>
  main {
    padding: 1rem;
    text-align: center;

    min-height: 100%;
  }
  h1 {
    font-size: xxx-large;
  }

  :global(html),
  :global(body) {
    padding: 0;
  }

  footer {
    padding: 1rem;
    text-align: center;
    height: 10%;
    background: #eee;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .message {
    text-align: center;
    color: grey;
    opacity: 10%;
  }
</style>
