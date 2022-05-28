<style>
  input {
    /* margin: 0; */
    padding: 0;
    text-align: center;
    max-width: 8rem;
    border: 0;
    color: darkgrey;
  }
</style>

<script lang="ts">
  export let name: string
  export let type: string
  export let value = null
</script>

<input
  class="{$$props.class}"
  id="{name}"
  name="{name}"
  value="{value ? value : null}"
  type="{type}" />
