import { UsersRepository } from "@/repositories/users-repository"
import { User } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-fount-error"

interface GetUserUseCaseRequest {
    userId: string
}

interface GetUserUseCaseResponse {
    user: User
}

export class GetUserUseCase {
    constructor (private UsersRepository: UsersRepository){}

    async execute ({userId}: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {

        const user = await this.UsersRepository.findById(userId)

        if (!user){
            throw new ResourceNotFoundError
        }

        return { user }
    }
}