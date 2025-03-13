import { FastifyInstance } from "fastify";
import { create } from "./create";
import { update } from "./update";
import { deletePijama } from "./delete";
import { read } from "./read";

export async function pijamaRoutes(app:FastifyInstance) {
    app.post('/pijamas', create)
    app.patch('/pijamas/:pijamaId', update)
    app.delete('/pijamas/:pijamaId', deletePijama)
    app.get('/pijamas/:pijamaId', read)
}