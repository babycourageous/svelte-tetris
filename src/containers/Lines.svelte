<script>
  import { getContext } from 'svelte'

  import Display from '../components/Display.svelte'
  import { TETRIS } from '../constants'

  const { lines } = getContext(TETRIS)

  const zeroPaddingTotal = 3

  $: display = padLines($lines)

  function padLines(currentLines) {
    // convert level number to string
    const lines = currentLines.toString()

    // determine amount to pad for the extra space at end
    const spacePadStart = Math.floor((5 - lines.length) / 2) + lines.length
    return lines.padStart(zeroPaddingTotal, '0')
  }
</script>

<Display>
  <div>
    <span>Lines {display}</span>
  </div>
</Display>

<style>
  div {
    width: 100%;
  }
  span {
    display: block;
    text-align: right;
  }
</style>
