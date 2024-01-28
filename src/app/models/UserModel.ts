import { PackageCart, TebexPackage } from "./StoreModel";

export class User{
  userName: string;
  uuid: string;
  email: string;
  roles: string[] = [];
  permissions: Permission[] = [];
  packages : PackageCart[] = [];
  banishmentEnd : Date | null = null
  lockoutEnd : Date | null = null

  constructor(userName: string, 
              uuid: string, 
              email: string, 
              roles: string[], 
              permissions: Permission[],
              packages : PackageCart[],
              banishmentEnd : Date | null,
              lockoutEnd : Date | null) {
    this.userName = userName;
    this.uuid = uuid;
    this.email = email;
    this.roles = roles;
    this.permissions = permissions;
    this.packages = packages;
    this.banishmentEnd = banishmentEnd
    this.lockoutEnd = lockoutEnd
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
  static AccessToRolesOnAdminPanel = "access:admin-panel_roles";
  static AccessToVotesOnAdminPanel = "access:admin-panel_votes";
  static AccessToGeneralSettingsOnAdminPanel = "access:admin-panel_general-settings";

  // Create

  static CreateRole = "create:role";

  // Update

  static UpdateUserInformations = "update:user_informations";
  static UpdateUserPunishment = "update:user_punishment";
  static UpdateGeneralSettings = "update:general-settings";
  static UpdateUserRole = "update:user_role";
  static UpdateRole = "update:role";

  // Delete

  static DeleteRole = "delete:role";
}