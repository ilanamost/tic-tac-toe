import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class VictoryService {
  isVictory: boolean = false;

  hasGameEnded(currValues, isTie) {
    const subsetsOfSize = this.getAllSubsetsOfSize(currValues, 3);
    let isVictory = false;

    subsetsOfSize.forEach(subset => {
      let sum = subset.reduce((acc, val) => acc + val, 0);
      if (sum === 15) {
        this.isVictory = true;
      }
    });

    return this.isVictory || isTie;
  }

  getAllSubsetsOfSize(array, size) {
    const subsets = this.getAllSubsets(array);
    let subsetsOfSize = [];

    subsets.forEach(subset => {
      if (subset.length === size) {
        subsetsOfSize.push(subset);
      }
    });

    return subsetsOfSize;
  }

  getAllSubsets(array) {
    return array.reduce(
      (subsets, value) => subsets.concat(
        subsets.map(set => [value, ...set])),
        [[]]
    );
  }
}
