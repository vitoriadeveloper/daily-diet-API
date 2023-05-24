import { makeUpdateMealUseCase } from "@/services/factories/make-update-meal-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function updateMeal(req: FastifyRequest, res: FastifyReply) {
    const updateBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        isDiet: z.coerce.boolean(),
        date: z.string().refine((value) => !isNaN(Date.parse(value))),
    });
    const paramsSchema = z.object({
        id: z.string(),
    });

    const { id } = paramsSchema.parse(req.params);
    const { name, description, isDiet } = updateBodySchema.parse(req.body);
    const updateMealUseCase = makeUpdateMealUseCase();
    await updateMealUseCase.execute({
        name,
        description,
        isDiet,
        dietId: id,
    });
}
