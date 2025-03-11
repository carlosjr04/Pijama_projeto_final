import { Prisma } from "@prisma/client";
import { AddressRepository } from "../address-repository";
import { prisma } from "@/lib/prisma";

export class PrismaAddressRepository implements AddressRepository {
  async findById(id: string) {
    const address = await prisma.address.findUnique({
      where: { id },
    });

    return address;
  }

  async firstOrCreate(data: Prisma.AddressCreateInput) {
    const address = await prisma.address.findUnique({
      where: {
        zip_code: data.zip_code,
      },
    });

    if (!address) {
      return await prisma.address.create({
        data,
      });
    }

    return address;
  }

  async deleteById(id: string) {
    const address = await prisma.address.findUnique({
      where: { id },
    });

    if (!address) {
      return;
    }

    await prisma.address.delete({
      where: { id },
    });
  }
}
