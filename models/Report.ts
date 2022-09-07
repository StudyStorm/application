import Card from "./Card";
import User from "./User";

export default interface Report {
  id: string;

  message: string;

  is_read: boolean;

  card: Card;

  author: User;

  created_at: Date;
}
