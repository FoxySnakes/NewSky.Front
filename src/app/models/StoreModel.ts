export class Listing{
    categories: Category[] = [];
    products: Product[] = [];
}

export class Category{
    id: number
    name: string

    constructor(id: number, name: string){
        this.id = id
        this.name = name
    }
}

export class Product{
    id: number
    name: string
    priceHt: number
    priceTtc: number
    image: string
    order: number

    constructor(id: number, 
                name: string, 
                priceHt: number, 
                image: string,
                order: number){
        this.id = id
        this.name = name
        this.priceHt = priceHt
        this.priceTtc = Math.round(priceHt * 1.2)
        this.image = image
        this.order = order
    }
}