<script lang="ts">
  import CatGrid from './components/cats/CatGrid.svelte'
  import CatAddMenu from './components/cats/CatAddMenu.svelte'

  let catAddMenu: CatAddMenu
</script>

<main on:contextmenu|preventDefault="{(e) => catAddMenu.show(e)}">
  <h1>This is The Cat API</h1>
  <h2>And this is epic</h2>

  <CatGrid />
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
