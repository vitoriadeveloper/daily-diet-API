import { makeDeleteMealUseCase } from "@/services/factories/make-delete-meal";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function deleteMeal(req: FastifyRequest, res: FastifyReply) {
    const paramsSchema = z.object({
        id: z.string(),
    });
    const { id } = paramsSchema.parse(req.params);
    const deleteMealUseCase = makeDeleteMealUseCase();
    await deleteMealUseCase.execute({
        dietId: id,
    });
}
