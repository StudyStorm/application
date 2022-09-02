import Model from "./Model";

export default class User extends Model {
  public id: string;

  public email: string;

  public password: string;

  public firstName: string;

  public lastName: string;

  public profilePicture: string;

  public isEmailVerified: boolean;

  get fullname(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
