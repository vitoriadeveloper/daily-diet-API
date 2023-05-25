import { PrismaMealsRepository } from "@/repositories/prisma/prisma-meals-repository";
import { CreateMealUseCase } from "../create-meal";

export function makeRegisterMealUseCase() {
    const prismaMealRepository = new PrismaMealsRepository();

    const registerUseCase = new CreateMealUseCase(prismaMealRepository);

    return registerUseCase;
}
