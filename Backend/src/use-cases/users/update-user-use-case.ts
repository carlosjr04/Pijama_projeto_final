import { UsersRepository, UserUpdateInput } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import { ResourceNotFoundError } from "../errors/resource-not-fount-error";

interface UpdateUserUseCaseRequest {
    userId: string,
    data: UserUpdateInput
}

interface UpdateUserUseCaseResponse {
    user: User
}

export class UpdateUserUseCase {
    constructor (private UsersRepository: UsersRepository){}

    async execute({userId, data}: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse>{

        const user = await this.UsersRepository.findById(userId)
        if (!user){
            throw new ResourceNotFoundError()
        }

        if (data.password){
            const isSamePassword = await compare(data.password, user.password)
    
            if (isSamePassword){
                throw new Error('As senhas devem ser diferentes!')
            }
    
            data.password = await hash(data.password, 6)
        }

        const userUpdated = await this.UsersRepository.update(userId, data)

        if (!userUpdated){
            throw new ResourceNotFoundError()
        }
    
        return { user: userUpdated }

    }
}