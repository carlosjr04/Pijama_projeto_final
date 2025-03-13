import { PijamasRepository } from "@/repositories/pijamas-repository"
import { Sale_pajamasRepository, Sale_pajamasUpdateInput } from "@/repositories/sale_pajamas-repository"
import { Sale_Pajamas } from "@prisma/client"
import { ResourceNotFoundError } from "../errors/resource-not-fount-error"

interface UpdateUseCaseRequest {
    sale_pajamaId: string
    data: Sale_pajamasUpdateInput
}

interface UpdateUseCaseResponse {
    sale_pajama: Sale_Pajamas | null
}

export class UpdateSale_PajamasUseCase {
    constructor(private sale_PajamasRepository: Sale_pajamasRepository, private pajamasRepository: PijamasRepository){}

    async execute( {sale_pajamaId, data }: UpdateUseCaseRequest ): Promise<UpdateUseCaseResponse> {
        
        const sale_pajama = await this.sale_PajamasRepository.findById(sale_pajamaId)
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

        const sale_pajamaUpdated = await this.sale_PajamasRepository.update(sale_pajamaId, data)
        if (!sale_pajamaUpdated){
            throw new ResourceNotFoundError()
        }

        return { sale_pajama: sale_pajamaUpdated}
    }
}