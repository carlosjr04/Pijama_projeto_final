import { AddressRepository, AddressUpdateInput } from "@/repositories/address-repository"
import { SalesRepository, SaleUpdateInput } from "@/repositories/sales-repository"
import { Sale } from "@prisma/client"
import { ResourceNotFoundError } from "../errors/resource-not-fount-error"

interface UpdateUseCaseRequest {
    saleId: string
    saleData: SaleUpdateInput
    addressData: AddressUpdateInput
}

interface UpdateUseCaseResponse {
    sale: Sale | null
}

export class UpdateSaleUseCase {
    constructor (private salesRepository: SalesRepository, private addressRepository: AddressRepository){}

    async execute({saleId, saleData, addressData}: UpdateUseCaseRequest): Promise<UpdateUseCaseResponse> {

        const saleExists = await this.salesRepository.findById(saleId)
        if (!saleExists){
            throw new ResourceNotFoundError()
        }
        
        if (saleData.card_number && !saleData.payment_method){
            throw new Error("Por favor, indique a forma de pagamento novamente")
        }

        if (saleData.payment_method){
            if (saleData.payment_method.toLowerCase() === "credit card" || saleData.payment_method.toLowerCase() === "debit card"){
                if (!saleData.card_number) {
                    throw new Error("O número do cartão é necessário para efetuar a compra no método de pagamento escolhido")
                }
            }else {
                saleData.card_number = ""
            }
        }

        
        if (addressData.zip_code || addressData.state || addressData.city || addressData.address || addressData.neighborhood || addressData.number){

            const updatedAddress = await this.addressRepository.firstOrCreate({
                zip_code: addressData.zip_code ?? "",
                state: addressData.state ?? "",
                city: addressData.city ?? "",
                address: addressData.address ?? "",
                neighborhood: addressData.neighborhood ?? "",
                number: addressData.number ?? ""
            
            })
    
            saleData.addressId = updatedAddress.id
        }

        const updatedSale = await this.salesRepository.update(saleId, saleData)

        return { sale: updatedSale }

    }
}