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

export interface UsersByCategories{
  categoryName : string;
  users : User[]
}

export interface AdminPanelPermissionDto {
  // Access
  accessToSalesOnAdminPanel: boolean;
  accessToUsersOnAdminPanel: boolean;
  accessToVotesOnAdminPanel: boolean;
  accessToGeneralSettingsOnAdminPanel: boolean;

  // Create
  createRole: boolean;

  // Update
  updateUserPermissions: boolean;
  updateUserUserName: boolean;
  updateUserStatus: boolean;
  manageUserCart: boolean;
  updateGeneralSettings: boolean;
  updateUserRole: boolean;
  updateRole: boolean;

  // Delete
  deleteRole: boolean;
}
