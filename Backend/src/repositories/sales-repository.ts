import { Prisma, Sale } from "@prisma/client";

export interface SaleUpdateInput {
    buyer_name?: string
    cpf?: string
    price?: string
    payment_method?: string
    installments?: string
    card_number?: string
    addressId?: string
}

export interface SalesRepository {
    create(data: Prisma.SaleUncheckedCreateInput): Promise<Sale>
    update(id: string, data: Prisma.SaleUncheckedCreateInput):Promise<Sale>
}