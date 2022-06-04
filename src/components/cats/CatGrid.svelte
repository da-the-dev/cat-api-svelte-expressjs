<script lang="ts">
  import CatCard from './CatCard.svelte'
  import { onMount } from 'svelte'
  import { getCats } from '../../modules/apiController'
  import { cats } from '../../stores/cats'

  // Updating cats on start
  onMount(async () => ($cats = await getCats()))
</script>

<main>
  <div class="catGrid">
    {#each $cats as cat, i}
      <CatCard dbId="{cat._id}" bind:cat />
    {/each}
  </div>
</main>

<style>
  .catGrid {
    justify-items: center;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: auto;
    grid-gap: 1rem;
    min-height: 100px;
  }
</style>
