export interface CardContent {
  question: string;
  answers: Array<{ label: string; isTheAnswer: boolean }>;
  type: string;
}

export default class Card {
  public id: string;

  public content: CardContent;
}
