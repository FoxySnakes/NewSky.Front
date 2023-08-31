export interface User {
    firstName: string | null;
    lastName: string | null;
    fullName: string | null;
    userName: string;
    uuid: string,
    email: string;
    birthday: Date | null;
    adressLine1: string;
    zipCode: string;
    city: string;
    country: string;
    phoneNumber: string | null;
    profilePictureUrl: string;
    role: Role;
    isEnabled: boolean;
    dateCreated: Date;
  }
  
  export enum Role {
    None = 0,
    Admin = 10,
    Moderator = 20,
    Helper = 30,
    Developer = 40,
  }
  