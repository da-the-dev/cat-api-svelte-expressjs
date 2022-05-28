<script lang="ts">
  import { Cat } from "../interfaces/cat"
  import CatCard from "./CatCard.svelte"
  const cats: Cat[] = [
    {
      name: "Emmy",
      age: 10,
    },
  ]
</script>

<div class="catGrid">
  {#each cats as cat, i}
    <CatCard cat="{cat}" />
  {/each}
</div>

<style>
  .catGrid {
    text-align: center;
    display: grid;
    justify-items: center;
  }
</style>
