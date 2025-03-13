import { Sale_pajamasRepository } from "@/repositories/sale_pajamas-repository";
import { PijamaSizeRepository } from "@/repositories/pijamaSize-repository";
import { PijamasRepository } from "@/repositories/pijamas-repository";


interface PajamaSize {
    pajamaId: string;
    quantity: number;
    size: string;
}

interface Pajama {
    pajamaId: string;
    quantity: number;
    price: number;
    size: string;
}

interface CreateUseCaseRequest {
    pajamas: PajamaSize[];
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
            const pajamaSize = await this.pajamaSizeRepository.getSize(pajama.pajamaId, pajama.size)

            pajamaSize!.stock_quantity = pajamaSize!.stock_quantity - pajama.quantity
            await this.pajamaSizeRepository.updateSize(pajama.pajamaId, pajamaSize!)
        }

        let pajamaList: Pajama[] = []

        for (const pajama of pajamas) {
            const samePajama = pajamaList.find((pjm)=>{
                return pjm.pajamaId === pajama.pajamaId
            })

            const pajamaPrice = await this.pajamasRepository.findById(pajama.pajamaId)

            if (samePajama === undefined) {
                pajamaList.push({
                    ...pajama,
                    price: pajamaPrice!.price * pajama.quantity

                })
            } else {
                const index = pajamaList.indexOf(samePajama)
                pajamaList[index].quantity += pajama.quantity
                pajamaList[index].price += pajamaPrice!.price * pajama.quantity
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
