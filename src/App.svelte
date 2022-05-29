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

    min-height: 120%;
    height: auto;
    margin-bottom: 20%;
    /* background: #ddd; */
  }
  h1 {
    font-size: xxx-large;
  }

  :global(html),
  :global(body) {
    padding: 0;
  }

  .message {
    text-align: center;
    color: grey;
    opacity: 10%;
    position: fixed;
    /* top: 50%; */
    width: 650;
    margin-left: -325px;
    left: 50%;
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
