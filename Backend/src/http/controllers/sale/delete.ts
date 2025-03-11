import { PrismaAddressRepository } from "@/repositories/prisma/prisma-address-repository";
import { PrismaSalesRepository } from "@/repositories/prisma/prisma-sales-repository";
import { DeleteSaleUseCase } from "@/use-cases/delete-sale-use-case";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error";
import { GetSaleUseCase } from "@/use-cases/get-sale-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteSale(request: FastifyRequest, reply: FastifyReply) {
  const getParamsSchema = z.object({
    saleId: z.string().uuid(),
  });

  const { saleId } = getParamsSchema.parse(request.params);

  try {
    const prismaSalesRepository = new PrismaSalesRepository();
    const prismaAddressRepository = new PrismaAddressRepository();

    const deleteSaleUseCase = new DeleteSaleUseCase(
      prismaSalesRepository,
      prismaAddressRepository
    );

    await deleteSaleUseCase.execute({
      saleId,
    });

    return await reply.status(200).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return await reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
