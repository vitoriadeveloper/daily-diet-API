import { fetchAllUserMealsOffDiet } from "@/services/factories/fetch-all-user-meals-off-diet";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getAllMetricsOffDiet(
    req: FastifyRequest,
    res: FastifyReply,
) {
    const getAllMeals = fetchAllUserMealsOffDiet();

    const { checkInsCount } = await getAllMeals.execute({
        userId: req.user.sub,
    });

    return res.status(200).send(checkInsCount);
}
