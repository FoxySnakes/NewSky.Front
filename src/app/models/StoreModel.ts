export interface TebexCategory {
    id: number;
    name: string;
    description?: string;
    packages: TebexPackage[];
    order: number;
}

export class TebexPackage {
    id!: number;
    name!: string;
    imageUrl!: string | null;
    priceHt!: number;
    priceTtc!: number;
    expirationDate!: Date | null;
    creationDate!: Date | null;
}

export interface TebexBuyer {
    id: number;
    userName: string;
    uuid: string;
}

export interface TebexSale {
    id: number;
    price: number;
    status: string;
    date: Date;
    packages: TebexSalePackage[];
    buyer: TebexBuyer;
}

export class TebexSalePackage {
    name!: string;
    imageUrl!: string | null;
    quantity!: number;
}

export class PackageCart{
    tebexPackage: TebexPackage;
    quantity: number;

    constructor(tebexPackage: TebexPackage, quantity: number){
        this.tebexPackage = tebexPackage,
        this.quantity = quantity
    }
}