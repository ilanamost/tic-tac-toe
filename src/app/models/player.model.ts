import { Move } from './move.model';

export class Player {
    public sign: string;
    public score: number;
    public values: number[];

    constructor(sign: string, score: number, values: number[]) {
        this.sign = sign;
        this.score = score;
        this.values = values;
    }
}