import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { RegisterUseCase } from "./register-user";
import { beforeEach, describe, expect, it } from "vitest";
import { compare } from "bcryptjs";
let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;
describe("Register use case", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new RegisterUseCase(usersRepository);
    });
    it("Must be able to register", async () => {
        const { user } = await sut.execute({
            name: "John Doe",
            email: "johndoe@gmail.com",
            password: "123456",
        });
        expect(user.id).toEqual(expect.any(String));
    });
    it("Must hash user password upon registration", async () => {
        const { user } = await sut.execute({
            name: "John Doe",
            email: "johndoe@gmail.com",
            password: "123456",
        });

        const isPasswordCorrectlyHashed = await compare(
            "123456",
            user.password_hash,
        );
        expect(isPasswordCorrectlyHashed).toBe(true);
    });
});
