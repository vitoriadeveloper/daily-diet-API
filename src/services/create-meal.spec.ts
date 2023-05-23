import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { CreateMealUseCase } from "./create-meal";
import { beforeEach, describe, expect, it } from "vitest";
import { UsersRepository } from "@/repositories/users-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { User } from "@prisma/client";

let mealsRepository: InMemoryMealsRepository;
let sut: CreateMealUseCase;
let usersRepository: UsersRepository;
let user: User;

describe("Create a meal user case", () => {
    beforeEach(async () => {
        mealsRepository = new InMemoryMealsRepository();
        usersRepository = new InMemoryUsersRepository();
        sut = new CreateMealUseCase(mealsRepository, usersRepository);
        user = await usersRepository.create({
            id: "user-01",
            name: "John Doe",
            email: "johndoe@example.com",
            password_hash: "123456",
        });
    });

    it("Should be able to create a meal", async () => {
        const { diet } = await sut.execute({
            name: "Feijão",
            description: "Uma feijoada pela manhã",
            isDiet: false,
            userId: user.id,
        });
        expect(diet.id).toEqual(expect.any(String));
    });
});
