import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateUseCase() {
    const prismaUserAuthenticate = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(prismaUserAuthenticate);

    return authenticateUseCase;
}
