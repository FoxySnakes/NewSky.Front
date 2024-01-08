export class TebexListing {
    categories: TebexCategory[];

    constructor() {
        this.categories = [];
    }
}

export class TebexCategory {
    id: number;
    name: string;
    description?: string;
    packages: TebexPackage[];
    order: number;

    constructor() {
        this.id = 0;
        this.name = '';
        this.packages = [];
        this.order = 0;
    }
}

export class TebexPackage {
    id: number;
    name: string;
    description: string;
    imageUrl?: string | null;
    basePrice: number;
    salesPrice: number;
    totalPrice: number;
    currency: string;
    discount: number;
    giftingEnable: boolean;
    expirationDate: Date | null;
    creationDate?: Date | null;

    constructor() {
        this.id = 0;
        this.name = '';
        this.description = '';
        this.basePrice = 0;
        this.salesPrice = 0;
        this.totalPrice = 0;
        this.currency = '';
        this.discount = 0;
        this.giftingEnable = false;
        this.creationDate = undefined
        this.expirationDate = new Date('9999-12-31T23:59:59')
    }
}
