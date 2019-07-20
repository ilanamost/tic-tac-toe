
export class Cell {
    public row: number;
    public column: number;
    public sign: string;
    public value: number;

    constructor(row: number, column: number, sign: string, value: number) {
        this.row = row;
        this.column = column;
        this.sign = sign;
        this.value = value;
    }
}