import { FastifyInstance } from "fastify";
import { create } from "./create";
import { update } from "./update";

export async function saleRoutes(app:FastifyInstance) {
    app.post('/sales', create)
    app.patch('/sales/:saleId', update)
}