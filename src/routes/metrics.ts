import { getAllMetrics } from "@/http/controllers/metrics/get-all";
import { getAllMetricsOffDiet } from "@/http/controllers/metrics/get-all-off-diet";
import { getAllMetricsDiet } from "@/http/controllers/metrics/get-all-user-diet";
import { FastifyInstance } from "fastify";

export async function metricsDailyRoutes(app: FastifyInstance) {
    app.get("/metrics/meals", getAllMetrics);
    app.get("/metrics/meals/diet", getAllMetricsDiet);
    app.get("/metrics/meals/offdiet", getAllMetricsOffDiet);
}
