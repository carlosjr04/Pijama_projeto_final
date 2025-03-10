import { Prisma, Address } from "@prisma/client";
import { AddressRepository } from "../address-repository";
import { prisma } from "@/lib/prisma";

export class PrismaAddressRepository implements AddressRepository {
    async firstOrCreate(data: Prisma.AddressCreateInput) {
        const address = await prisma.address.upsert({
            where: { 
                zip_code_state_city_neighborhood_address_number: {
                    zip_code: data.zip_code,
                    state: data.state,
                    city: data.city,
                    neighborhood: data.neighborhood,
                    address: data.address,
                    number: data.number
                }
             },

             update: {},
             create: data
        })

        return address
    }
}