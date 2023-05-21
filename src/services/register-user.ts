import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";

interface RegisterUserCaseResponse {
    user: User;
}

interface RegisterUserCaseRequest {
    name: string;
    email: string;
    password: string;
}

export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        name,
        email,
        password,
    }: RegisterUserCaseRequest): Promise<RegisterUserCaseResponse> {
        const password_hash = await hash(password, 10);

        const user = await this.usersRepository.create({
            name,
            email,
            password_hash,
        });

        return { user };
    }
}
