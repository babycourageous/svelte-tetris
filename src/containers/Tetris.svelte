<script>
  // components
  import Statistics from './Statistics.svelte'
  import Lines from './Lines.svelte'
  import Board from './Board.svelte'
  import Score from './Score.svelte'
  import NextPiece from './NextPiece.svelte'
  import Level from './Level.svelte'
</script>

<div class="game">

  <section class="stats">
    <Statistics />
  </section>

  <section>
    <Lines />
    <Board />
  </section>

  <section class="meta">
    <!-- SCORE -->
    <Score />
    <!-- NEXT PIECE -->
    <NextPiece />
    <!-- LEVEL -->
    <Level />
  </section>
</div>

<style>
  .game {
    max-width: 56rem;
    display: grid;
    grid-template-columns: 220px auto 200px;
  }
  section {
    display: flex;
    flex-direction: column;
  }
  .stats {
    align-items: flex-end;
  }
  .meta {
    align-items: flex-start;
  }
</style>