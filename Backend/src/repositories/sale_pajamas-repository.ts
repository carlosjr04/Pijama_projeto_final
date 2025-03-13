import { Prisma, Sale_Pajamas } from "@prisma/client";

export interface Sale_pajamasUpdateInput {
    quantity?: number
    price?: number
}

export interface Sale_pajamasRepository {
    findById(id: string): Promise<Sale_Pajamas | null>
    getBySaleId(saleId: string): Promise<Sale_Pajamas[] | null>
    createMany(data: Prisma.Sale_PajamasCreateManyInput[]): Promise<void>
    update(id: string, data: Prisma.Sale_PajamasUpdateInput): Promise<Sale_Pajamas | null>
    getSale_PajamasBySaleId(saleId: string): Promise<Sale_Pajamas[]| null>
}