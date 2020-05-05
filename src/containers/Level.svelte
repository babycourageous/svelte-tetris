<script>
  import { getContext } from 'svelte'

  import Display from '../components/Display.svelte'
  import { TETRIS } from '../constants'

  const zeroPaddingTotal = 2
  const displayLength = 5

  const { level } = getContext(TETRIS)

  $: display = padLevel($level)

  function padLevel(currentLevel) {
    // convert level number to string
    const level = currentLevel.toString()

    // determine amount to pad for the extra space at end
    const spacePadStart = Math.floor((5 - level.length) / 2) + level.length
    return level
      .padStart(zeroPaddingTotal, '0')
      .padEnd(spacePadStart, ' ')
      .padStart(displayLength, ' ')
  }
</script>

<Display>
  <div>
    <span>Level</span>
    <span class="display">{display}</span>
  </div>
</Display>

<style>
  span {
    display: block;
  }
  .display {
    white-space: pre;
  }
</style>
