import { Prisma, Sale_Pajamas } from "@prisma/client";

export interface Sale_pajamasRepository {
    findById(id: string): Promise<Sale_Pajamas | null>
    create(data: Prisma.Sale_PajamasUncheckedCreateInput): Promise<Sale_Pajamas>
}