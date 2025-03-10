import { Prisma, Sale } from "@prisma/client";
import { SalesRepository } from "../sales-Repository";
import { prisma } from "@/lib/prisma";

export class PrismaSalesRepository implements SalesRepository {
    async create(data: Prisma.SaleCreateInput) {
        const sale = await prisma.sale.create({
            data
        })

        return sale
    }

}