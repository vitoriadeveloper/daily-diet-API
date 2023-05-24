import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let mealsRepository: InMemoryMealsRepository;
let sut: GetUserMetricsUseCase;

describe("Get user metrics use case", () => {
    beforeEach(async () => {
        mealsRepository = new InMemoryMealsRepository();
        sut = new GetUserMetricsUseCase(mealsRepository);
        await mealsRepository.create({
            id: "diet-01",
            name: "Feijão",
            description: "Uma feijoada pela manhã",
            isDiet: false,
            userId: "user.id",
        });
        await mealsRepository.create({
            id: "diet-02",
            name: "Arroz",
            description: "Arroz com feijão",
            isDiet: false,
            userId: "user.id",
        });
        await mealsRepository.create({
            id: "diet-03",
            name: "Arroz",
            description: "Arroz com feijão",
            isDiet: true,
            userId: "user.id",
        });
        await mealsRepository.create({
            id: "diet-04",
            name: "Arroz",
            description: "Arroz com feijão",
            isDiet: true,
            userId: "user.id",
        });
    });

    it("Should be possible to get metrics from all meals within the diet", async () => {
        const { diet } = await sut.execute({
            userId: "user.id",
        });
        expect(diet).toEqual([
            expect.objectContaining({ id: "diet-03" }),
            expect.objectContaining({ id: "diet-04" }),
        ]);
    });
});
