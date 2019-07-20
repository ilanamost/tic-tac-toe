import { Component } from '@angular/core';
import { Game } from './models/game.model'
import { Board } from './models/board.model';
import { Player } from './models/player.model';
import { Cell } from './models/cell.model';
import { Move } from './models/move.model';
import { GameService } from './services/game.service';
import { VictoryService } from './services/victory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tic-tac-toe';
  isModalOpen = false;

  constructor(private gameService: GameService, 
    private victoryService: VictoryService) {}
  
  get winner(): Player {
    return this.gameService.winner;
  }

  get isGameOver(): boolean {
    return this.gameService.game.isOver;
  }

  get playerOneScore(): number {
    return this.gameService.players[0].score;
  }

  get playerTwoScore(): number {
    return this.gameService.players[1].score;
  }
 
  ngOnInit() {
    this.gameService.initGame(true);
    this.gameService.gameEnded.subscribe((res) => {
      this.isModalOpen = true;
    });
  }

  onModalAction(type) {
    switch(type) {
      case 'resetGame':
        this.gameService.resetGame();
        break;

      case 'closeModal':
        this.gameService.closeModal();
        break;
    }
    this.isModalOpen = false;
  }

  onTableAction(type) {
    switch(type.title) {
      case 'makeMove':
        this.gameService.makeMove(type.i, type.j);
        break;
    }
  }
}
