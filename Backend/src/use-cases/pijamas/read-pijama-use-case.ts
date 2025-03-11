// src/use-cases/pijamas/read-pijama-use-case.ts

import { PijamasRepository } from "@/repositories/pijamas-repository";
import { Pajamas } from "@prisma/client";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error";

interface ReadPijamaUseCaseRequest {
    pijamaId: string;
}

interface ReadPijamaUseCaseResponse {
    pijama: Pajamas;
}

export class ReadPijamaUseCase {
    constructor(private pijamasRepository: PijamasRepository) {}

    async execute({ pijamaId }: ReadPijamaUseCaseRequest): Promise<ReadPijamaUseCaseResponse> {
        const pijama = await this.pijamasRepository.findById(pijamaId);

        if (!pijama) {
            throw new ResourceNotFoundError("Pijama não encontrado.");
        }

        return { pijama };
    }
}
