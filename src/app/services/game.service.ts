import { Injectable } from "@angular/core";
import { Cell } from "../models/cell.model";
import { Move } from "../models/move.model";
import { Subject } from "rxjs";
import { Board } from "../models/board.model";
import { Game } from "../models/game.model";
import { Player } from "../models/player.model";
import { VictoryService } from "./victory.service";

@Injectable({ providedIn: "root" })
export class GameService {
  board: Board;
  game: Game;
  players: Player[];
  cells: Cell[][];
  currTurn: number = 0;
  playerOne: Player;
  playerTwo: Player;
  possibleMoves: Move[];
  isGameOver: boolean = false;
  winner: Player;
  gameEnded = new Subject<boolean>();

  constructor(private victoryService: VictoryService) {}

  create2DArray(size) {
    let arr = [];
    for (let i = 0; i < size; i++) {
      arr[i] = [];

      for (let j = 0; j < size; j++) {
        arr[i][j] = null;
      }
    }

    return arr;
  }

  initCells() {
    let arr = this.create2DArray(3);
    const numbers = [[4, 9, 2], [3, 5, 7], [8, 1, 6]];

    for (let i = 0; i < arr.length; i++) {
      let row = arr[i];
      for (let j = 0; j < row.length; j++) {
        let cell = new Cell(i, j, '', numbers[i][j]);
        row[j] = cell;
      }
    }
    return arr;
  }

  initMoves(currBoard) {
    const board = currBoard.cells;
    let moves: Move[] = [];

    for (let i = 0; i < board.length; i++) {
      let row = board[i];

      for (let j = 0; j < row.length; j++) {
        const move: Move = new Move(i, j);
        moves.push(move);
      }
    }
    return moves;
  }

  getPossibleMoves(moves, currMove) {
    let moveIdx = moves.findIndex(
      move => move.x === currMove.x && move.y === currMove.y
    );
    moves.splice(moveIdx, 1);
  }

  initGame(firstGame) {
    this.cells = this.initCells();
    this.board = new Board(this.cells);
    this.possibleMoves = this.initMoves(this.board);
    this.playerOne = this.setPlayer(this.playerOne, "x", firstGame);
    this.playerTwo = this.setPlayer(this.playerTwo, "o", firstGame);
    this.players = [this.playerOne, this.playerTwo];
    this.game = new Game(
      this.currTurn,
      this.board,
      this.players,
      this.isGameOver
    );
  }

  setPlayer(player, sign, isFirstGame) {
    return isFirstGame ? new Player(sign, 0, []) : player;
  }

  makeMove(row, col) {
    if (this.cells[row][col].sign !== "" || this.game.isOver) {
      return;
    }
    this.cells[row][col].sign = this.players[this.currTurn].sign;
    this.players[this.currTurn].values.push(this.cells[row][col].value);
    this.getPossibleMoves(this.possibleMoves, { x: row, y: col });
    this.game.isOver = this.victoryService.hasGameEnded(
      this.players[this.currTurn].values,
      this.isTie()
    );

    if (this.game.isOver) {
      this.handleGameEnd();
      this.gameEnded.next(true);
    } else {
      this.currTurn = (this.currTurn + 1) % this.players.length;
    }
  }

  handleGameEnd() {
    if (!this.isTie()) {
      this.setWinner();
    }
  }

  setWinner() {
    this.players[this.currTurn].score += 5;
    this.winner = this.players[this.currTurn];
  }

  isTie() {
    if (this.possibleMoves.length === 0) {
      return !this.victoryService.isVictory;
    }

    return false;
  }

  closeModal() {
    this.winner = null;
  }

  resetValues() {
    this.playerOne.values = [];
    this.playerTwo.values = [];
    this.victoryService.isVictory = false;
  }

  resetGame() {
    this.game.isOver = false;
    this.winner = null;
    this.currTurn = 0;
    this.resetValues();
    this.initGame(false);
  }
}
