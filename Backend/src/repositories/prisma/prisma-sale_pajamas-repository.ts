import { Prisma, Sale_Pajamas } from "@prisma/client";
import { Sale_pajamasRepository } from "../sale_pajamas-repository";
import { prisma } from "@/lib/prisma";

export class PrismaSale_PajamasRepository implements Sale_pajamasRepository {

    async create(data: Prisma.Sale_PajamasUncheckedCreateInput) {
        const sale_pajamas = await prisma.sale_Pajamas.create({
            data
        })

        return sale_pajamas
    }

    async findById(id: string) {
        const sale_Pajamas = await prisma.sale_Pajamas.findUnique({
            where: { id }
        })

        return sale_Pajamas
    }
}