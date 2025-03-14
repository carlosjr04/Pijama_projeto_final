import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-fount-error";

interface GetAllUseCaseResponse {
    users: User[] | null
}

export class GetAllUsersUseCase {
    constructor(private usersRepository: UsersRepository){}

    async execute(): Promise<GetAllUseCaseResponse> {
        const users = await this.usersRepository.getAll()
        if (!users){
            throw new ResourceNotFoundError()
        }

        return { users }
    }
}