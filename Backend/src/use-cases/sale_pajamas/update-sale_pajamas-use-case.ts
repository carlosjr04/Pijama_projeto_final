import { PijamasRepository } from "@/repositories/pijamas-repository"
import { Sale_pajamasRepository, Sale_pajamasUpdateInput } from "@/repositories/sale_pajamas-repository"
import { Sale, Sale_Pajamas } from "@prisma/client"
import { ResourceNotFoundError } from "../errors/resource-not-fount-error"
import { SalesRepository } from "@/repositories/sales-repository"

interface UpdateUseCaseRequest {
    sale: Sale
    sale_pajamaId: string
    data: Sale_pajamasUpdateInput
}

interface UpdateUseCaseResponse {
    sale_pajama: Sale_Pajamas | null
}

export class UpdateSale_PajamasUseCase {
    constructor(
        private salePajamasRepository: Sale_pajamasRepository, 
        private pajamasRepository: PijamasRepository,
        private salesRepository: SalesRepository
    ){}

    async execute( {sale, sale_pajamaId, data }: UpdateUseCaseRequest ): Promise<UpdateUseCaseResponse> {

        const sale_pajama = await this.salePajamasRepository.findById(sale_pajamaId)
        if (!sale_pajama){
            throw new ResourceNotFoundError()
        }

        if (data.quantity){
            const pajama = await this.pajamasRepository.findById(sale_pajama.pajamasId)
            if (!pajama){
                throw new ResourceNotFoundError()
            }

            data.price = data.quantity*pajama.price
        }

        const sale_pajamaUpdated = await this.salePajamasRepository.update(sale_pajamaId, data)
        if (!sale_pajamaUpdated){
            throw new ResourceNotFoundError()
        }

        const sale_pajamas = await this.salePajamasRepository.getBySaleId(sale.id)
            if (!sale_pajamas){
                throw new ResourceNotFoundError()
            }

            let totalPrice:number = 0

            for (const element of sale_pajamas){
                totalPrice += element.price
            }

            sale.price = totalPrice

        return { sale_pajama: sale_pajamaUpdated}
    }
}