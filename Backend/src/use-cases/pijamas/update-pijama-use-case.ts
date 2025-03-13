import { PijamasRepository, PijamaUpdateInput } from "@/repositories/pijamas-repository";
import { Pajamas, PajamaSize } from "@prisma/client";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error";

interface UpdatePijamaUseCaseRequest {
    pijamaId: string;
    data: PijamaUpdateInput;
    sizes?: PajamaSize[]; // Tamanhos a serem atualizados
}

interface UpdatePijamaUseCaseResponse {
    pijama: Pajamas;
}

export class UpdatePijamaUseCase {
    constructor(private pijamasRepository: PijamasRepository) {}

    async execute({
        pijamaId,
        data,
        sizes,
    }: UpdatePijamaUseCaseRequest): Promise<UpdatePijamaUseCaseResponse> {
        // Verificar se o pijama existe
        const pijama = await this.pijamasRepository.findById(pijamaId);
        if (!pijama) {
            throw new ResourceNotFoundError("Pijama não encontrado.");
        }

        // Atualizar os dados do pijama
        const pijamaUpdated = await this.pijamasRepository.update(pijamaId, data);

        if (!pijamaUpdated) {
            throw new ResourceNotFoundError("Erro ao atualizar o pijama.");
        }

        // Se tamanhos forem fornecidos, atualizar os tamanhos do pijama
        if (sizes) {
            await this.pijamasRepository.updateSizes(pijamaId, sizes);
        }

        return { pijama: pijamaUpdated };
    }
}
