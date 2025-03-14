import { Prisma, Sale } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { SalesRepository } from "../sales-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error";

export class PrismaSalesRepository implements SalesRepository {

  async getAll(){
    const sales = prisma.sale.findMany()

    return sales
  }

  async findById(id: string) {
    const sale = await prisma.sale.findUnique({
      where: { id },
    });

    return sale;
  }

  async update(id: string, data: Prisma.SaleUncheckedUpdateInput) {
    const sale = await prisma.sale.update({
      where: { id },
      data: {
        buyer_name: data.buyer_name,
        cpf: data.cpf,
        price: data.price,
        payment_method: data.payment_method,
        installments: data.installments,
        card_number: data.card_number,
        addressId: data.addressId,
      },
    });

    return sale;
  }

  async create(data: Prisma.SaleUncheckedCreateInput) {
    const sale = await prisma.sale.create({
      data,
    });

    return sale;
  }

  async deleteById(id: string) {
    const sale = await prisma.sale.findUnique({
      where: { id },
    });

    if (!sale) {
      throw new ResourceNotFoundError();
    }

    await prisma.sale.delete({
      where: { id },
    });
  }

  async findSalesByAddressId(addressId: string) {
    const sales = await prisma.sale.findMany({
      where: { addressId },
    });

    return sales;
  }
}
