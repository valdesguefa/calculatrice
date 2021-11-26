import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CalculeService {
  screen$: BehaviorSubject<string[]> = new BehaviorSubject(["_"]);
  x!: string[];
  y!: string[];
  operator!: string;

  constructor() {}

  write$(num: string): void {
    let liste: string[] = this.screen$.value;

    if (
      liste[0] === "_" ||
      liste[0] === "/" ||
      liste[0] === "x" ||
      liste[0] === "-" ||
      liste[0] === "+"
    ) {
      liste.splice(0);
      liste.push(num);
    } else {
      liste.push(num);
    }

    this.screen$.next(liste);
  }

  operation$(operation: string): void {
    this.x = this.screen$.value;

    operation == "x" ? (this.operator = "*") : (this.operator = operation);

    let liste: string[] = [operation];
    this.screen$.next(liste);
  }

  result$(resultat: string): void {
    if (resultat == "clear") {
      this.x = this.y = [];
      this.operator = "";
      let liste: string[] = ["_"];
      this.screen$.next(liste);
    } else {
      this.y = this.screen$.value;

      let num1: number = Number(this.x.join(""));
      let num2: number = Number(this.y.join(""));
      let result: number;

      if (this.operator == "/") {
        result = num1 / num2;
        let liste: string[] = [String(result)];
        this.screen$.next(liste);
      } else if (this.operator == "*") {
        result = num1 * num2;
        let liste: string[] = [String(result)];
        this.screen$.next(liste);
      } else if (this.operator == "-") {
        result = num1 - num2;
        let liste: string[] = [String(result)];
        this.screen$.next(liste);
      } else if (this.operator == "+") {
        result = num1 + num2;
        let liste: string[] = [String(result)];
        this.screen$.next(liste);
      }
    }
  }
}
