import { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(req: FastifyRequest, res: FastifyReply) {
    const token = await res.jwtSign({
        sign: {
            sub: req.user.sub,
        },
    });

    const refreshToken = await res.jwtSign({
        sign: {
            sub: req.user.sub,
            expiresIn: "7 days",
        },
    });
    return res
        .setCookie("refreshToken", refreshToken, {
            path: "/",
            secure: true,
            sameSite: true,
            httpOnly: true,
        })
        .status(200)
        .send({
            token,
        });
}
