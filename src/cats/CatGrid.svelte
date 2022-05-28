<script lang="ts">
  import { Cat } from '../interfaces/cat'
  import CatCard from './CatCard.svelte'
  import CatAddMenu from '../components/CatAddMenu.svelte'

  const cats: Cat[] = [
    {
      name: 'Emmy',
      age: 10,
    },
  ]

  let catAddMenu: CatAddMenu
</script>

<main>
  <div
    class="catGrid"
    on:contextmenu|preventDefault="{(e) => {
      catAddMenu.show(e)
    }}"
  >
    {#each cats as cat, i}
      <CatCard cat="{cat}" />
    {/each}
  </div>
  <CatAddMenu bind:this="{catAddMenu}" />
</main>

<style>
  .catGrid {
    text-align: center;
    display: grid;
    justify-items: center;
  }
</style>
