import { PijamasRepository } from "@/repositories/pijamas-repository";
import { Pajamas, PajamaSize } from "@prisma/client";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error";
import { PijamaSizeRepository } from "@/repositories/pijamaSize-repository";

interface ReadPijamaUseCaseRequest {
    pijamaId: string;
}

interface ReadPijamaUseCaseResponse {
    pijama: Pajamas;
    sizes: PajamaSize[]
}

export class ReadPijamaUseCase {
    constructor(private pijamasRepository: PijamasRepository, private pijamaSizeRepository: PijamaSizeRepository) {}

    async execute({ pijamaId }: ReadPijamaUseCaseRequest): Promise<ReadPijamaUseCaseResponse> {
        const pijama = await this.pijamasRepository.findById(pijamaId);

        if (!pijama) {
            throw new ResourceNotFoundError("Pijama não encontrado.");
        }

        const sizes = await this.pijamaSizeRepository.getSizes(pijamaId);

        return { pijama, sizes };
    }
}
