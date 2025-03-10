import { SalesRepository } from "@/repositories/sales-Repository";
import { Address, Sale } from "@prisma/client";

interface CreateUseCaseRequest {
    buyer_name: string,
    cpf: string,
    address: Address,
    payment_method: string,
    installments?: number,
    card_number?: string

}

interface CreateUseCaseResponse {
    sale: Sale
}

export class CreateSaleUseCase {
    constructor (private SaleRepository: SalesRepository){}

    async execute({buyer_name, cpf, address, payment_method, installments, card_number}: CreateUseCaseRequest): Promise<CreateUseCaseResponse> {
        if (payment_method.toLowerCase() === "credit card" || payment_method.toLowerCase() === "debit card"){
            if (!card_number) {
                throw new Error("O número do cartão é necessário para efetuar a compra no método de pagamento escolhido")
            }
        }

        const sale = await this.SaleRepository.create({
            buyer_name,
            cpf,
            address,
            payment_method,
            installments,
            card_number
        })

        return { sale }
    }
}