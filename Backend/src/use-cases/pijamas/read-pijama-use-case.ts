// src/use-cases/pijamas/read-pijama-use-case.ts

import { PijamasRepository } from "@/repositories/pijamas-repository";
import { Pajamas, PajamaSize } from "@prisma/client";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error";

interface ReadPijamaUseCaseRequest {
    pijamaId: string;
}

interface ReadPijamaUseCaseResponse {
    pijama: Pajamas;
    sizes: PajamaSize[]
}

export class ReadPijamaUseCase {
    constructor(private pijamasRepository: PijamasRepository) {}

    async execute({ pijamaId }: ReadPijamaUseCaseRequest): Promise<ReadPijamaUseCaseResponse> {
        const pijama = await this.pijamasRepository.findById(pijamaId);

        if (!pijama) {
            throw new ResourceNotFoundError("Pijama não encontrado.");
        }

        const sizes = await this.pijamasRepository.getSizes(pijamaId);

        return { pijama, sizes };
    }
}
