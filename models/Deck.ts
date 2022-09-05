import Card from "./Card";
import Folder from "./Folder";
import User from "./User";

export default interface Deck {
  id: string;

  name: string;

  folder: Folder;

  creator: User;

  cards: Card[];

  votes: { number: number };

  createdAt: Date;

  updatedAt: Date;
}
