import { Prisma, Address } from "@prisma/client";
import { AddressRepository } from "../address-repository";
import { prisma } from "@/lib/prisma";

export class PrismaAddressRepository implements AddressRepository {
    async create(data: Prisma.AddressCreateInput) {
        const address = await prisma.address.create({
            data
        })

        return address
    }
    
}