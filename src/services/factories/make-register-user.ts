import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "../register-user";

export function makeRegisterUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(prismaUsersRepository);

    return registerUseCase;
}
