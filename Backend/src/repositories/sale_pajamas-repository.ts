import { Prisma, Sale_Pajamas } from "@prisma/client";

export interface Sale_pajamasUpdateInput {
    quantity?: number
    price?: number
    pajamaId?: string
}

export interface Sale_pajamasRepository {
    findById(id: string): Promise<Sale_Pajamas | null>
    getBySaleId(saleId: string): Promise<Sale_Pajamas[] | null>
    createMany(data: Prisma.Sale_PajamasCreateManyInput[]): Promise<void>
    update(id: string, data: Prisma.Sale_PajamasUncheckedCreateInput): Promise<Sale_Pajamas | null>
}