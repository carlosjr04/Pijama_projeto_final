import { AddressRepository } from "@/repositories/address-repository"
import { SalesRepository } from "@/repositories/sales-repository"
import { Address, Sale } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-fount-error"

interface GetUseCaseRequest {
    saleId: string
}

interface GetUseCaseResponse{
    sale: Sale,
    address: Address,
}

export class GetSaleUseCase {
    constructor(private salesRepository: SalesRepository, private addressRepository: AddressRepository){}

    async execute ({saleId}: GetUseCaseRequest): Promise<GetUseCaseResponse> {

        const sale = await this.salesRepository.findById(saleId)
        if (!sale){
            throw new ResourceNotFoundError
        }

        const address = await this.addressRepository.findById(sale.addressId)
        if (!address){
            throw new ResourceNotFoundError
        }

        return { sale, address }
    }
}

