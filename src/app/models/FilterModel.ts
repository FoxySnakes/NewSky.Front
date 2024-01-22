export class PaginationResult<T> {
    pageSize : number;
    pageNumber : number;
    pageSizeOptions : number[]
    totalCount : number
    items : T[]

    constructor(totalCount? : number, 
                items? : T[],
                pageSizeOptions? : number[],
                pageNumber? : number, 
                pageSize? : number){
        totalCount? this.totalCount = totalCount : this.totalCount = 0
        items ? this.items = items : this.items = []
        pageSizeOptions ? this.pageSizeOptions = pageSizeOptions : this.pageSizeOptions = [5,10,25,50,100]
        pageNumber ? this.pageNumber = pageNumber : this.pageNumber = 1
        pageSize ? this.pageSize = pageSize : this.pageSize = 10
    }
}

export class Filter{
    name : string
    direction : 'asc' | 'desc' = 'asc'

    constructor(name : string, direction : 'asc' | 'desc'){
        this.name = name
        this.direction = direction
    }
}