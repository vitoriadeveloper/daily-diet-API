import { makeGetAllUserMealsUseCase } from "@/services/factories/make-get-all-user-meals";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function getOnlyMeal(req: FastifyRequest, res: FastifyReply) {
    const paramsSchema = z.object({
        id: z.string(),
    });
    const { id } = paramsSchema.parse(req.params);
    const getOnlyMealUseCase = makeGetAllUserMealsUseCase();
    const { diets } = await getOnlyMealUseCase.execute({
        dietId: id,
    });

    return res.status(200).send({
        diets,
    });
}
