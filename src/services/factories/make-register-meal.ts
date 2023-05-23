import { PrismaMealsRepository } from "@/repositories/prisma/prisma-meals-repository";
import { CreateMealUseCase } from "../create-meal";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export function makeRegisterMealUseCase() {
    const prismaMealRepository = new PrismaMealsRepository();
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerUseCase = new CreateMealUseCase(
        prismaMealRepository,
        prismaUsersRepository,
    );

    return registerUseCase;
}
