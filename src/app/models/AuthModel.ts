export interface LoginDto {
  UserNameOrEmail: string;
  Password: string;
  RememberMe: boolean;
}

export interface RegisterDto{
  UserName: string;
  Password: string;
  Email: string;
  RememberMe: boolean;
}

export interface AccountManageDto{
  success: boolean;
  error: string;
}

export class PermissionName {
  // Access

  static AccessToAdminPanel = "access:admin-panel";
  static AccessToSalesOnAdminPanel = "access:admin-panel_sales";
  static AccessToUsersOnAdminPanel = "access:admin-panel_users";
  static AccessToVotesOnAdminPanel = "access:admin-panel_votes";

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