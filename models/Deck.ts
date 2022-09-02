import Model from "./Model";
import User from "./User";

export default class Deck extends Model {
  public id: string;

  public name: string;

  // public folder: Folder;

  public creator: User;

  public votes: number;

  public createdAt: Date;

  public updatedAt: Date;

  get formattedVotes(): string {
    const formatter = Intl.NumberFormat("en", { notation: "compact" });
    return formatter.format(this.votes);
  }
}
