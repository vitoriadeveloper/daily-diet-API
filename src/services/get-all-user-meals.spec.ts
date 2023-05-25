import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { GetAllUserMealsUseCase } from "./get-all-user-meals";
import { beforeEach, expect, describe, it } from "vitest";

let mealsRepository: InMemoryMealsRepository;
let sut: GetAllUserMealsUseCase;

describe("Get all meal of a user use case", () => {
    beforeEach(async () => {
        mealsRepository = new InMemoryMealsRepository();
        sut = new GetAllUserMealsUseCase(mealsRepository);
        await mealsRepository.create({
            id: "diet-01",
            name: "Feijão",
            description: "Uma feijoada pela manhã",
            isDiet: false,
            userId: "user.id",
            date: new Date(),
        });
        await mealsRepository.create({
            id: "diet-02",
            name: "Arroz",
            description: "Amo arroz",
            isDiet: true,
            userId: "user.id",
            date: new Date(),
        });
        await mealsRepository.create({
            id: "diet-03",
            name: "Carne",
            description: "Carne de frango",
            isDiet: false,
            userId: "user.id",
            date: new Date(),
        });
    });
    it("Should be able to get all user meals", async () => {
        const { diets } = await sut.execute({
            dietId: "diet-03",
        });

        expect(diets).toHaveLength(1);
        expect(diets).toEqual([expect.objectContaining({ id: "diet-03" })]);
    });
});
