<script>
  import Display from '../components/Display.svelte'
</script>

<Display>
  <div class="scoreboard">
    <span>Score</span>
    <span>000162</span>
  </div>
</Display>

<style>
  .scoreboard {
    display: flex;
    flex-direction: column;
    align-content: center;
  }
  span {
    display: block;
  }
</style>
