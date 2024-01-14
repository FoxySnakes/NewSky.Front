import { PackageCart, TebexPackage } from "./StoreModel";

export class User{
  userName: string;
  uuid: string;
  email: string;
  roles: string[];
  permissions: string[];
  packages : PackageCart[] = []

  constructor(userName: string, 
              uuid: string, 
              email: string, 
              roles: string[], 
              permissions: string[],
              packages : PackageCart[]) {
    this.userName = userName;
    this.uuid = uuid;
    this.email = email;
    this.roles = roles;
    this.permissions = permissions;
    this.packages = packages;
  }
}