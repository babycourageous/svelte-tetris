<script>
  import { getContext } from 'svelte'

  import { TETRIS } from '../constants'
  import Display from '../components/Display.svelte'

  const { score } = getContext(TETRIS)

  $: display = $score.toString().padStart(6, '0')
</script>

<Display>
  <div class="scoreboard">
    <span>Score</span>
    <span>{display}</span>
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
