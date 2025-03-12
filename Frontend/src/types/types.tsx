export interface pijama{
    id:number
    name:string
    description:string
    image:string 
    price: number 
    season: string 
    type:string | number
    gender:string | number
    size:size[]
    favorite:boolean 
    on_sale: boolean 
    sale_percent:number 
}

export interface feedback{
    id:number
    name:string 
    description:string 
    rating:number
}
export interface size{
    stock_quantity:number
    size:string
}
