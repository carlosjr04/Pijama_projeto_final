import { UsersRepository } from "@/repositories/users-repository"
import { User } from "@prisma/client"
import { ResourceNotFoundError } from "../errors/resource-not-fount-error"

interface DeleteUserUseCaseRequest {
    userId: string
}

interface DeleteUserUseCaseResponse {
    user: User
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