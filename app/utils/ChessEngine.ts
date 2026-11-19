import type { BoardApi, Promotion, SquareKey } from "vue3-chessboard";

export class ChessEngine {
  private worker: Worker;
  private board: BoardApi;
  private thinking = false;
  private ready = false;

  constructor(board: BoardApi) {
    this.board = board;

    const supportsWasm =
      typeof WebAssembly === "object" &&
      WebAssembly.validate(Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0));

    this.worker = new Worker(
      supportsWasm ? "/stockfish.wasm.js" : "/stockfish.js",
    );

    this.worker.onmessage = (event: MessageEvent<string>) => {
      const message = event.data;

      if (message === "uciok") {
        this.worker.postMessage("isready");
      }

      if (message === "readyok") {
        this.ready = true;
      }

      if (!message.startsWith("bestmove ")) return;
      if (!this.thinking) return;

      this.thinking = false;

      const move = message.split(" ")[1];

      if (!move || move === "(none)") return;
      if (this.board.getTurnColor() !== "black") return;

      this.board.move({
        from: move.slice(0, 2) as SquareKey,
        to: move.slice(2, 4) as SquareKey,
        promotion: move[4] as Promotion | undefined,
      });
    };

    this.worker.onerror = (error) => {
      console.error("Stockfish error:", error);
      this.thinking = false;
    };

    this.worker.postMessage("uci");
  }

  play(moves: string[]) {
    if (!this.ready || this.thinking) return;
    if (this.board.getTurnColor() !== "black") return;

    this.thinking = true;

    this.worker.postMessage(
      moves.length
        ? `position startpos moves ${moves.join(" ")}`
        : "position startpos",
    );

    // Short thinking time for a casual game.
    this.worker.postMessage("go movetime 500");
  }

  destroy() {
    this.worker.postMessage("quit");
    this.worker.terminate();
  }
}
