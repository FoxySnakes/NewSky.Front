export interface LoginDto {
  UserNameOrEmail: string;
  Password: string;
  RememberMe: boolean;
}

export interface RegisterDto{
  FirstName: string;
  LastName: string;
  UserName: string;
  Password: string;
  Email: string;
  Birthday: Date;
  Address: string;
  ZipCode: string;
  City: string;
  Country: string;
  PhoneNumber: string
}

export interface AccountManageDto{
  success: boolean;
  error: string;
}