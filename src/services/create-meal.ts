import { MealsRepository } from "@/repositories/meals-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { Diet } from "@prisma/client";
import { ResourceNotFound } from "./errors/resource-not-found";

interface CreateMealUserCaseResponse {
    diet: Diet;
}

interface CreateMealUserCaseRequest {
    userId: string;
    name: string;
    description: string;
    isDiet: boolean;
}

export class CreateMealUseCase {
    constructor(
        private mealsRepository: MealsRepository,
        private usersRepository: UsersRepository,
    ) {}

    async execute({
        name,
        description,
        isDiet,
        userId,
    }: CreateMealUserCaseRequest): Promise<CreateMealUserCaseResponse> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new ResourceNotFound();
        }

        const diet = await this.mealsRepository.create({
            name,
            description,
            isDiet,
            userId,
        });

        return { diet };
    }
}
