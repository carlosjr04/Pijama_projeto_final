export interface roupa{
    name:string
    description:string
    image:string 
    price: number 
    season: string 
    type:string | number
    gender:string | number
    size:string 
    favorite:boolean 
    on_sale: boolean 
    sale_percent:number 
}
export interface roupa_lista{
    id:number
    name:string
    image:string 
    price: number 
    favorite:boolean 
    on_sale: boolean 
    sale_percent:number 
}
