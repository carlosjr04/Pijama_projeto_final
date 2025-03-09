import { UsersRepository } from "@/repositories/users-repository"
import { ResourceNotFoundError } from "./errors/resource-not-fount-error"

interface DeleteUserUseCaseRequest {
    userId: string
}


export class DeleteUserUseCase {
    constructor (private UsersRepository: UsersRepository){}

    async execute({userId}: DeleteUserUseCaseRequest){
        const user = await this.UsersRepository.findById(userId)
        if (!user){
            throw new ResourceNotFoundError()
        }

        await this.UsersRepository.delete(userId)
    }
}