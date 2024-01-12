export class PaginationResult<T> {
    pageSize : number;
    pageNumber : number;
    pageSizeOptions : number[]
    totalPageCount : number
    items : T[]

    constructor(totalPageCount? : number, 
                items? : T[],
                pageSizeOptions? : number[],
                pageNumber? : number, 
                pageSize? : number){
        totalPageCount? this.totalPageCount = totalPageCount : this.totalPageCount = 0
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