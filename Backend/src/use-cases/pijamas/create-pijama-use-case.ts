// src/use-cases/pijamas/create-pijama-use-case.ts

import { PijamasRepository } from "@/repositories/pijamas-repository";
import { Pajamas, PajamaSize } from "@prisma/client";

interface CreateUseCaseRequest {
    name: string;
    description: string;
    image: string;
    price: number;
    season: string;
    type: string;
    gender: string;
    favorite: boolean;
    on_sale: boolean;
}

interface CreateUseCaseResponse {
    pijama: Pajamas;
}

export class CreateUseCase {
    constructor(private pijamasRepository: PijamasRepository) {}

    async execute({
        name,
        description,
        image,
        price,
        season,
        type,
        gender,
        favorite,
        on_sale,
    }: CreateUseCaseRequest): Promise<CreateUseCaseResponse> {
        const pijama = await this.pijamasRepository.create({
            name,
            description,
            image,
            price,
            season,
            type,
            gender,
            favorite,
            on_sale,
        });

        // Criando os tamanhos padrão associados ao pijama
        const sizes = ["PP", "P", "M", "G", "GG"].map((size) => ({ // ESTÁ SEM TIPO // FAZER DEPOIS!!!!
            stock_quantity: 0, // Definindo a quantidade inicial de estoque, se necessário
            size,
            pajamaId: pijama.id,
        }));

        // Criação dos tamanhos associados ao pijama
        await this.pijamasRepository.createSizes(sizes);

        return { pijama };
    }
}
