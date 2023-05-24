import { makeFetchAllMealsMetrics } from "@/services/factories/fetch-all-meals-metrics";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getAllMetrics(req: FastifyRequest, res: FastifyReply) {
    const getAllMeals = makeFetchAllMealsMetrics();

    const { checkInsCount } = await getAllMeals.execute({
        userId: req.user.sub,
    });

    return res.status(200).send(checkInsCount);
}
