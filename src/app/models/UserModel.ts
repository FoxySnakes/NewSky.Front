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
  [key: string]: string;
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

  // Description

  static permissionDescriptions: Record<string, string> = {
    [PermissionName.AccessToAdminPanel]: "Accéder au pannel d'administration",
    [PermissionName.AccessToDashboardOnAdminPanel]: "Accéder au tableau de bord dans le panneau d'administration",
    [PermissionName.AccessToSalesOnAdminPanel]: "Accéder aux ventes dans le panneau d'administration",
    [PermissionName.AccessToUsersOnAdminPanel]: "Accéder aux utilisateurs dans le panneau d'administration",
    [PermissionName.AccessToRolesOnAdminPanel]: "Accéder aux rôles dans le panneau d'administration",
    [PermissionName.AccessToVotesOnAdminPanel]: "Accéder aux votes dans le panneau d'administration",
    [PermissionName.AccessToGeneralSettingsOnAdminPanel]: "Accéder aux paramètres généraux dans le panneau d'administration",
    [PermissionName.CreateRole]: "Créer un rôle",
    [PermissionName.UpdateUserInformations]: "Mettre à jour les informations de l'utilisateur",
    [PermissionName.UpdateUserPunishment]: "Mettre à jour les sanctions de l'utilisateur",
    [PermissionName.UpdateGeneralSettings]: "Mettre à jour les paramètres généraux",
    [PermissionName.UpdateUserRole]: "Mettre à jour le rôle de l'utilisateur",
    [PermissionName.UpdateRole]: "Mettre à jour le rôle",
    [PermissionName.DeleteRole]: "Supprimer le rôle"
};

static getDescription(permission: string): string {
    return this.permissionDescriptions[permission] || '';
}
}