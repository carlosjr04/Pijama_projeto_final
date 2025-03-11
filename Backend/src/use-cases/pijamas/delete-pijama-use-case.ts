// src/use-cases/pijamas/delete-pijama-use-case.ts

import { PijamasRepository } from "@/repositories/pijamas-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error";

interface DeleteUseCaseRequest {
    pijamaId: string;
}

export class DeletePijamaUseCase {
    constructor(private pijamasRepository: PijamasRepository) {}

    async execute({ pijamaId }: DeleteUseCaseRequest): Promise<void> {
        // Verificar se o pijama existe
        const pijama = await this.pijamasRepository.findById(pijamaId);

        if (!pijama) {
            throw new ResourceNotFoundError
        }

        // Excluir os tamanhos associados ao pijama
        await this.pijamasRepository.deleteSizes(pijamaId);

        // Excluir o pijama
        await this.pijamasRepository.delete(pijamaId);
    }
}
