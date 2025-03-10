import { AddressRepository } from "@/repositories/address-repository";
import { SalesRepository } from "@/repositories/sales-repository";
import { Sale } from "@prisma/client";


interface CreateAddressUseCaseRequest {
    zip_code: string,
    state: string,
    city: string,
    neighborhood: string,
    address: string,
    number: string
}
interface CreateSaleUseCaseRequest {
    buyer_name: string,
    cpf: string,
    price: number,
    payment_method: string,
    installments?: number,
    card_number?: string

}

interface CreateSaleUseCaseResponse {
    sale: Sale
}

export class CreateSaleUseCase {
    constructor (private SalesRepository: SalesRepository, private AddressRepository: AddressRepository){}

    async execute({buyer_name, cpf, price, payment_method, installments, card_number}: CreateSaleUseCaseRequest, {zip_code, state, city, address, neighborhood, number}: CreateAddressUseCaseRequest): Promise<CreateSaleUseCaseResponse> {

        if (payment_method.toLowerCase() === "credit card" || payment_method.toLowerCase() === "debit card"){
            if (!card_number) {
                throw new Error("O número do cartão é necessário para efetuar a compra no método de pagamento escolhido")
            }
        }

        const createdAddress = await this.AddressRepository.create({
            zip_code,
            state,
            city,
            address,
            neighborhood,
            number

        })

        const sale = await this.SalesRepository.create({
            buyer_name,
            cpf,
            price,
            Address: { connect: { id: createdAddress.id } },
            payment_method,
            installments,
            card_number
        })

        return { sale }
    }
}