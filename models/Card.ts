import Deck from "./Deck";

export interface Answer {
  label: string;
  isTheAnswer: boolean;
}

export interface CardContent {
  question: string;
  answers: Array<Answer>;
  type: string;
}

export default interface Card {
  id: string;

  content: CardContent;

  deck: Deck;
}
