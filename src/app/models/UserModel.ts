import { PackageCart, TebexPackage } from "./StoreModel";

export class User{
  userName: string;
  uuid: string;
  email: string;
  roles: string[] = [];
  permissions: Permission[] = [];
  packages : PackageCart[] = []

  constructor(userName: string, 
              uuid: string, 
              email: string, 
              roles: string[], 
              permissions: Permission[],
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

export interface Permission{
  name: string;
  hasPermission: boolean | null
}

export class PermissionName {
  // Access

  static AccessToAdminPanel = "access:admin-panel";
  static AccessToDashboardOnAdminPanel = "access:admin-panel_dashboard";
  static AccessToSalesOnAdminPanel = "access:admin-panel_sales";
  static AccessToUsersOnAdminPanel = "access:admin-panel_users";
  static AccessToVotesOnAdminPanel = "access:admin-panel_votes";
  static AccessToGeneralSettingsOnAdminPanel = "access:admin-panel_general-settings";

  // Create

  static CreateRole = "create:role";

  // Update

  static UpdateUserPermissions = "update:user_permissions";
  static UpdateUserUserName = "update:user_username";
  static UpdateUserStatus = "update:user_status";
  static ManageUserCart = "update:user_cart";
  static UpdateGeneralSettings = "update:general-settings";
  static UpdateUserRole = "update:user_role";
  static UpdateRole = "update:role";

  // Delete

  static DeleteRole = "delete:role";
}