import { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(req: FastifyRequest, res: FastifyReply) {
    const token = await res.jwtSign({
        // se eu quisesse pegar so sub, declarava apenas sub, sem sign
        sign: {
            sub: req.user.sign.sub,
        },
    });

    const refreshToken = await res.jwtSign({
        sign: {
            sub: req.user.sign.sub,
            expiresIn: "7 days",
        },
    });
    console.log(req.user.sign.sub);
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
