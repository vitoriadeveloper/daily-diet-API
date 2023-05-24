import { PrismaMealsRepository } from "@/repositories/prisma/prisma-meals-repository";
import { GetAllMealsUseCase } from "../get-all";

export function makeGetAllMeals() {
    const prismaMealsRepository = new PrismaMealsRepository();
    const getAllUseCase = new GetAllMealsUseCase(prismaMealsRepository);
    return getAllUseCase;
}
