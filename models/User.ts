export default interface User {
  id: string;

  email: string;

  password?: string;

  first_name: string;

  last_name: string;

  isEmailVerified: boolean;

  picture_url: string;
}
