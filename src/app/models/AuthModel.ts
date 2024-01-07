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