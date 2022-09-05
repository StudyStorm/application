import Folder from "./Folder";
import User from "./User";

export default interface Classroom {
  id: string;

  name: string;

  root_folder: Folder;

  folders: Folder[];

  users: User[];
}
