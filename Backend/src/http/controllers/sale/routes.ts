import { FastifyInstance } from "fastify";
import { create } from "./create";
import { update } from "./update";
import { get } from "./get";
import { deleteSale } from "./delete";

export async function saleRoutes(app: FastifyInstance) {
  app.post("/sales", create);
  app.patch("/sales/:saleId", update);
  app.get("/sales/:saleId", get);
  app.delete("/sales/:saleId", deleteSale);
}
