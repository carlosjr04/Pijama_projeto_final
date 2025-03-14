import { PijamasRepository } from "@/repositories/pijamas-repository";
import { PijamaSizeCreateInput, PijamaSizeRepository } from "@/repositories/pijamaSize-repository";
import { PajamaSize } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-fount-error";

interface UpdatePijamaSizeCaseRequest {
    pajamaId: string,
    stock_quantity: number,
    size: string
}

interface UpdatePijamaSizeCaseResponse {
    pijamaSize: PajamaSize;
}

export class UpdatePijamaSizeUseCase {
    constructor(private pijamaSizeRepository: PijamaSizeRepository) {}

    async execute({
        pajamaId,
        stock_quantity,
        size
    }: UpdatePijamaSizeCaseRequest): Promise<void> {
        let data = await this.pijamaSizeRepository.getSize(pajamaId, size)
        if (!data){
            throw new ResourceNotFoundError()
        }

        data!.stock_quantity = stock_quantity
        await this.pijamaSizeRepository.updateSize(pajamaId, data!)
    }
}
