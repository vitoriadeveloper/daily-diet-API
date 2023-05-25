import { makeRegisterMealUseCase } from "@/services/factories/make-register-meal";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createMeal(req: FastifyRequest, res: FastifyReply) {
    const postBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        isDiet: z.coerce.boolean().default(false),
        date: z.string().refine((value) => !isNaN(Date.parse(value))),
    });

    const { name, description, isDiet, date } = postBodySchema.parse(req.body);
    const createMealUserCase = makeRegisterMealUseCase();
    const formattedDate = new Date(date).toISOString();

    await createMealUserCase.execute({
        name,
        description,
        isDiet,
        userId: req.user.sign.sub,
        date: new Date(formattedDate),
    });
    return res.status(201).send();
}
