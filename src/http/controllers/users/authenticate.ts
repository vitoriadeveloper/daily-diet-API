import { InvalidCredentialsError } from "@/services/errors/invalid-credentials";
import { makeAuthenticateUseCase } from "@/services/factories/make-authenticate";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string(),
    });

    const { email, password } = authenticateBodySchema.parse(req.body);

    try {
        const authenticateUseCase = makeAuthenticateUseCase();
        const { user } = await authenticateUseCase.execute({ email, password });

        const token = await res.jwtSign({
            sign: {
                sub: user.id,
            },
        });

        return token;
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return res.status(400).send({ message: error.message });
        }
        throw error;
    }
}
