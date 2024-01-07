export class User{
  userName: string;
  uuid: string;
  email: string;
  emailConfirmed: boolean;
  role: string;

  constructor(userName: string, uuid: string, email: string, emailConfirmed: boolean, role: string) {
    this.userName = userName;
    this.uuid = uuid;
    this.email = email;
    this.emailConfirmed = emailConfirmed;
    this.role = role;
  }
}