import { MealsRepository } from "@/repositories/meals-repository";
import { Diet } from "@prisma/client";

export class GetAllMealsUseCase {
    constructor(private mealsRepository: MealsRepository) {}

    async execute(): Promise<Diet[]> {
        return this.mealsRepository.getAll();
    }
}
