import { GameService } from './../../services/game.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cell } from '../../models/cell.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() cells: Cell[][];
  @Input() isGameOver: boolean;
  @Output() tableAction: EventEmitter<any> = new EventEmitter<any>();

  constructor(private gameService: GameService) { }

  ngOnInit() {
  }

  makeMove(i, j) {
    this.tableAction.emit({title:'makeMove', i, j});
  }

  getHighlight(row, col) {
    return this.gameService.possibleMoves.filter(
      move => (move.x === row && move.y === col)).length > 0;
  }

}
