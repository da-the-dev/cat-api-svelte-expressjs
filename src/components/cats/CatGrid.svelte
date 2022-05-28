<script lang="ts">
  import { Cat, DBCat } from '../../interfaces/cat'
  import CatCard from './CatCard.svelte'
  import CatAddMenu from './CatAddMenu.svelte'
  import { onMount } from 'svelte'
  import { getCats } from '../../modules/apiController'

  export let cats: DBCat[] = []

  $: loadedCats = cats

  onMount(async () => {
    cats = await getCats()
  })

  let catAddMenu: CatAddMenu
</script>

<main>
  <div
    class="catGrid"
    on:contextmenu|preventDefault="{(e) => {
      catAddMenu.show(e)
    }}"
  >
    {#each loadedCats as cat, i}
      <CatCard bind:cats dbId="{cat._id}" cat="{cat}" />
    {/each}
  </div>

  <CatAddMenu bind:cat="{cats}" bind:this="{catAddMenu}" />
</main>

<style>
  .catGrid {
    /* text-align: center; */
    justify-items: center;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: auto;
    grid-gap: 1rem;
    min-height: 100px;
  }
</style>
