import { PijamasRepository } from "@/repositories/pijamas-repository";
import { PijamaSizeRepository } from "@/repositories/pijamaSize-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error";

interface DeleteUseCaseRequest {
    pijamaId: string;
}

export class DeletePijamaUseCase {
    constructor(private pijamasRepository: PijamasRepository, private pijamaSizeRepository: PijamaSizeRepository) {}

    async execute({ pijamaId }: DeleteUseCaseRequest): Promise<void> {
        const pijama = await this.pijamasRepository.findById(pijamaId);

        if (!pijama) {
            throw new ResourceNotFoundError
        }

        await this.pijamaSizeRepository.deleteSizes(pijamaId);

        await this.pijamasRepository.delete(pijamaId);
    }
}
