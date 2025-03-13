import { Sale_pajamasRepository } from "@/repositories/sale_pajamas-repository";
import { QuantityNotSufficientError } from "../errors/quantity-not-sufficient-error";
import { ResourceNotFoundError } from "../errors/resource-not-fount-error";
import { PijamaSizeRepository } from "@/repositories/pijamaSize-repository";
import { PijamasRepository } from "@/repositories/pijamas-repository";


interface Pajama {
    pajamaId: string;
    price: number;
    quantity: number;
    size: string;
}

interface CreateUseCaseRequest {
    pajamas: Pajama[];
    saleId: string;
}

export class CreateSalePajamasUseCase {
    constructor(
        private salePajamasRepository: Sale_pajamasRepository,
        private pajamasRepository: PijamasRepository,
        private pajamaSizeRepository: PijamaSizeRepository
    ) {}

    async execute({ pajamas, saleId }: CreateUseCaseRequest) {
        for (const pajama of pajamas) {
            const pajamaExists = await this.pajamasRepository.findById(pajama.pajamaId);

            const pajamaSize = await this.pajamaSizeRepository.getSize(pajama.pajamaId, pajama.size)

            if (pajamaSize === null || !pajamaExists){
                throw new ResourceNotFoundError()
            }

            if (pajamaSize.stock_quantity < pajama.quantity){
                throw new QuantityNotSufficientError()
            }
        }

        for (const pajama of pajamas) {
            const pajamaSize = await this.pajamaSizeRepository.getSize(pajama.pajamaId, pajama.size)

            pajamaSize!.stock_quantity = pajamaSize!.stock_quantity - pajama.quantity
            await this.pajamaSizeRepository.updateSize(pajama.pajamaId, pajamaSize!)
        }

        let pajamaList: Pajama[] = []

        for (const pajama of pajamas) {
            const samePajama = pajamaList.find((pjm)=>{
                return pjm.pajamaId === pajama.pajamaId
            })

            if (samePajama === undefined) {
                pajamaList.push(pajama)
            } else {
                const index = pajamaList.indexOf(samePajama)
                pajamaList[index].quantity += pajama.quantity
                pajamaList[index].price += pajama.price
            }
        }

        await this.salePajamasRepository.createMany(
            pajamaList.map(pajama => ({
                pajamasId: pajama.pajamaId,
                quantity: pajama.quantity,
                price: pajama.price,
            saleId
            }))
        )
    }
}
