import { Permission } from "./UserModel";

export class Role{
    name : string;
    description: string;
    color : string;
    isDefault : boolean = false
    permissions : Permission[] = []

    constructor(name : string, description : string, color : string, permissions : Permission[]){
        this.name = name;
        this.description = description;
        this.color = color

        this.permissions = permissions
    }
}