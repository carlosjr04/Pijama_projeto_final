import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { User } from "@prisma/client";
import { UserAlreadyExists } from "../errors/user-already-exists-error";

interface RegisterUseCaseRequest {
    name: string,
    username: string,
    email: string,
    password: string
}

interface RegisterUseCaseResponse {
    user: User
}

export class RegisterUseCase {
    constructor (private UsersRepository: UsersRepository){}

    async execute ({name, username, email, password}: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {

        const userWithSameUsername = await this.UsersRepository.findByUsername(username)
        if (userWithSameUsername){
            throw new UserAlreadyExists()
        }

        const userWithSameEmail = await this.UsersRepository.findByEmail(email)
        if (userWithSameEmail){
            throw new UserAlreadyExists()
        }

        const password_hash = await hash(password, 6)

        const user = await this.UsersRepository.create({
            name,
            username,
            email,
            password: password_hash
        })

        return { user }

    }
}