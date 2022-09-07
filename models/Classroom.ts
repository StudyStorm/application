import Folder from "./Folder";
import User from "./User";

export default interface Classroom {
  id: string;

  name: string;

  visibility: "public" | "private";

  root_folder: Folder;

  folders: Folder[];

  users: User[];

  permissions: {
    is_member: boolean;
    write: boolean;
    delete: boolean;
  };

  nb_members: number;
}
