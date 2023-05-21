import fastify from "fastify";
import { dietDailyRoutes } from "./routes/diet";
export const app = fastify();
app.register(dietDailyRoutes);
