export interface User {
    UserName : string,
    Uuid : string,
    Email : string,
    EmailConfirmed : boolean,
    Role : string
  }
  
  export class Role {
    None = "None";
    Helper = "Helper";
    Moderator = "Moderator";
    Admin = "Admin";
    SuperAdmin = "SuperAdmin";
    Developer = "Developer";
  }
  