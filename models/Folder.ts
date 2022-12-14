import Classroom from "./Classroom";
import Deck from "./Deck";
import User from "./User";

export default interface Folder {
  id: string;

  name: string;

  classroom_id: string;

  classroom: Classroom;

  creator: User;

  parent: Folder;

  decks: Deck[];

  children: Folder[];

  path: {
    id: string;
    name: string;
  }[];
}
