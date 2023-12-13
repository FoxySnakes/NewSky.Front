export interface User{
  userName: string;
  uuid: string;
  email: string;
  emailConfirmed: boolean;
  role: string;
}

export interface UserPrivateInfo{
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  zipCode: string;
  city: string;
  address: string;
  country: string;
}