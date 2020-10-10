export interface SinglePlayerGame {
  start(): void;
  inspect(): void;
  selectOptionByIndex(index: number): void;
}