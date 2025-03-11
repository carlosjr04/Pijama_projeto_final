// src/use-cases/errors/resource-not-fount-error.ts

export class ResourceNotFoundError extends Error {
    constructor(message?: string) {
        super(message || 'Resource not found error!'); // Se a mensagem não for fornecida, usa o valor padrão
        this.name = "ResourceNotFoundError"; // Definindo o nome da classe como "ResourceNotFoundError"
    }
}
