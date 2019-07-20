import { Cell } from './cell.model'

export class Board {
    public cells: Cell[][];

    constructor(cells :Cell[][]) {
        this.cells = cells;
    }
}