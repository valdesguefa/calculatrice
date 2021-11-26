import { Component, OnInit, OnDestroy } from "@angular/core";
import { CalculeService } from "../shared/services/calcule.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-calculette",
  templateUrl: "./calculette.component.html",
  styleUrls: ["./calculette.component.scss"],
})
export class CalculetteComponent implements OnInit {
  on: boolean = true;
  touches: string[] = [
    "7",
    "8",
    "9",
    "4",
    "5",
    "6",
    "1",
    "2",
    "3",
    ".",
    "0",
    "( - )",
  ];

  operators: string[] = ["/", "x", "-", "+"];

  egals: string[] = ["clear", "="];

  affichage!: string;

  S1: Subscription = new Subscription();

  constructor(private calcule: CalculeService) {}

  ngOnInit(): void {
    this.S1 = this.calcule.screen$.subscribe(
      (text: string[]) => (this.affichage = text.join(""))
    );
  }

  write(i: number): void {
    i == 11 ? this.calcule.write$(" -") : this.calcule.write$(this.touches[i]);
  }

  operation(n: number): void {
    this.calcule.operation$(this.operators[n]);
  }

  result(e: number): void {
    this.calcule.result$(this.egals[e]);
  }

  ngOnDestroy(): void {
    this.S1.unsubscribe;
  }
}
