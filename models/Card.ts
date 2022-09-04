import Deck from "./Deck";

export interface CardContent {
  question: string;
  answers: Array<{ label: string; isTheAnswer: boolean }>;
  type: string;
}

export default interface Card {
  id: string;

  content: CardContent;

  deck: Deck;
}
