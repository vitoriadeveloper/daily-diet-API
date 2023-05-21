import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials";
let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;
describe("Authenticate user case", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new AuthenticateUseCase(usersRepository);
    });

    it("Must be able to authenticate", async () => {
        await usersRepository.create({
            name: "John Doe",
            email: "johndoe@gmail.com",
            password_hash: await hash("123456", 10),
        });
        const { user } = await sut.execute({
            email: "johndoe@gmail.com",
            password: "123456",
        });

        expect(user.id).toEqual(expect.any(String));
    });
    it("Must not be able to authenticate with wrong email", async () => {
        await expect(() =>
            sut.execute({
                email: "johndoe@gmail.com",
                password: "123456",
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
    it("Must not be able to authenticate with wrong password", async () => {
        await usersRepository.create({
            name: "John Doe",
            email: "johndoe@gmail.com",
            password_hash: await hash("123456", 10),
        });

        await expect(() =>
            sut.execute({
                email: "johndoe@gmail.com",
                password: "36256354",
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});
