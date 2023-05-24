import { fetchUserMealsDiet } from "@/services/factories/fetch-user-meals-diet";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getAllMetricsDiet(
    req: FastifyRequest,
    res: FastifyReply,
) {
    const getAllMeals = fetchUserMealsDiet();

    const { diet } = await getAllMeals.execute({
        userId: req.user.sub,
    });

    return res.status(200).send(diet);
}
