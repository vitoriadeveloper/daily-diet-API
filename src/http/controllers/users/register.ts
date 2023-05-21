import { UserAlreadyExistsError } from "@/services/errors/user-already-exists";
import { makeRegisterUseCase } from "@/services/factories/make-register-user";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
export async function register(req: FastifyRequest, res: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { name, email, password } = registerBodySchema.parse(req.body);

    try {
        const registerUseCase = makeRegisterUseCase();
        await registerUseCase.execute({ name, email, password });
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return res.status(409).send({ message: error.message });
        }
        throw error;
    }
}
