<script>
  import { onMount, getContext } from 'svelte'

  import Display from '../components/Display.svelte'
  import Piece from '../components/Piece.svelte'
  import { TETRIS } from '../constants'

  const { stats, tetrominos } = getContext(TETRIS)
</script>

<Display>
  <div>
    <div class="title">Statistics</div>
    {#each $stats as stat}
      <div class="stat">
        <Piece
          width={45}
          height={20}
          piece={tetrominos[stat.id - 1]}
          scale={0.5}
          xOffset={(4 - tetrominos[stat.id - 1].matrix[0].length) / 2} />
        <span>{stat.count.toString().padStart(3, '0')}</span>
      </div>
    {/each}
  </div>
</Display>

<style>
  .stat {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
  }
</style>
