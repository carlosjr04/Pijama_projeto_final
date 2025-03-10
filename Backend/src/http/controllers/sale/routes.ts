import { FastifyInstance } from "fastify";
import { create } from "./create";

export async function saleRoutes(app:FastifyInstance) {
    app.post('/sales', create)
}