import { AddressRepository } from "@/repositories/address-repository"
import { SalesRepository, SaleUpdateInput } from "@/repositories/sales-repository"
import { Sale } from "@prisma/client"

interface UpdateUseCaseRequest {
    saleId: string
    data: SaleUpdateInput
}

interface UpdateUseCaseResponse {
    sale: Sale
}

export class UpdateSaleUseCase {
    constructor (private salesRepository: SalesRepository, private addressRepository: AddressRepository){}

    async execute({saleId, data}: UpdateUseCaseRequest): Promise<UpdateUseCaseResponse> {
        
        if (data.card_number && !data.payment_method){
            throw new Error("Por favor, indique a forma de pagamento novamente")
        }

        if (data.payment_method){
            if (data.payment_method.toLowerCase() === "credit card" || data.payment_method.toLowerCase() === "debit card"){
                if (!data.card_number) {
                    throw new Error("O número do cartão é necessário para efetuar a compra no método de pagamento escolhido")
                }
            }
        }

        const updatedSale = await this.salesRepository.update(saleId, data)

    }
}