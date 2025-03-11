import { Prisma, Sale } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { SalesRepository } from "../sales-repository";

export class PrismaSalesRepository implements SalesRepository {
    async update(id: string, data: Prisma.SaleUncheckedCreateInput) {
        const sale = await prisma.sale.update({
            where: { id },
            data: {
                buyer_name: data.buyer_name,
                cpf: data.cpf,
                price: data.price,
                payment_method: data.payment_method,
                installments: data.installments,
                card_number: data.card_number,
                addressId: data.addressId
            }
        })

        return sale
    }

    async create(data: Prisma.SaleUncheckedCreateInput) {
        const sale = await prisma.sale.create({
            data
        })

        return sale
    }

}