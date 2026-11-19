<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import { TheChessboard, type BoardApi } from "vue3-chessboard";
import "vue3-chessboard/style.css";

import { ChessEngine } from "~/utils/ChessEngine";

let boardApi: BoardApi | null = null;
let engine: ChessEngine | null = null;

const gameKey = ref(0);

function onBoardCreated(api: BoardApi) {
  boardApi = api;
  engine = new ChessEngine(api);
}

function onMove() {
  if (!boardApi || !engine) return;

  // Only calculate a response after White moves.
  if (boardApi.getTurnColor() !== "black") return;

  const history = boardApi.getHistory(true);

  const moves = history.map((move) =>
    typeof move === "string" ? move : move.lan,
  );

  engine.play(moves);
}

function newGame() {
  engine?.destroy();
  engine = null;
  boardApi = null;

  // Remount the chessboard from its starting position.
  gameKey.value++;
}

onBeforeUnmount(() => {
  engine?.destroy();
});
</script>

<template>
  <div class="chess-app" data-no-drag>
    <h2 class="chess-app__title">Chess vs Computer</h2>
    <ClientOnly>
      <TheChessboard
        :key="gameKey"
        player-color="white"
        @board-created="onBoardCreated"
        @move="onMove"
      />
    </ClientOnly>
    <div class="chess-app__toolbar">
      <div class="chess-app__games-count">Games played: {{ gameKey }}</div>

      <button @click="newGame">New Game</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chess-app {
  max-width: 100%;
  max-height: 100%;

  display: flex;
  align-items: start;
  gap: 20px;
  overflow-y: auto;

  &__title {
    margin-bottom: 0;

    color: #000;
  }
  &__toolbar {
    display: flex;
    flex-direction: column;

    gap: 16px;

    margin-bottom: 16px;

    h2 {
      font-size: 18px;
    }

    button {
      padding: 8px 14px;
      border: 0;
      border-radius: 6px;

      background: #468b66;
      color: white;
      cursor: pointer;
    }
  }

  &__games-count {
    font-size: 20px;
    color: #000;
  }
}
</style>
