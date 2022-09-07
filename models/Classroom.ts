import Folder from "./Folder";
import User from "./User";

export enum ClassroomAccessRight {
  R = "read",
  RW = "read_write",
  RWD = "read_write_delete",
  OWNER = "owner",
  SUBSCRIBER = "subscriber",
}

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
