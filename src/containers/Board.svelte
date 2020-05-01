<script>
  import Display from '../components/Display.svelte'

  export let width
  export let height
</script>

<Display>
  <canvas {width} {height} />
</Display>
