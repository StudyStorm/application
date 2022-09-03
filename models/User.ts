import Model from "./Model";

export default class User extends Model {
  public id: string;

  public email: string;

  public first_name: string;

  public last_name: string;

  public profilePicture: string;

  public isEmailVerified: boolean;

  get fullname(): string {
    return `${this.first_name} ${this.last_name}`;
  }
}
