import { FastifyInstance } from "fastify";
import { create } from "./create";
import { update, updateSize } from "./update";
import { deletePijama } from "./delete";
import { read } from "./read";
import { getAll } from "./getAll";
import { createMany } from "./createMany";

export async function pijamaRoutes(app:FastifyInstance) {
    app.post('/pijamas', create)
    app.patch('/pijamas/:pijamaId', update)
    app.delete('/pijamas/:pijamaId', deletePijama)
    app.get('/pijamas/:pijamaId', read)
    app.patch('/pijamas/:pijamaId/:size', updateSize)
    app.get('/pijamas/getAll', getAll)
    app.post('/pijamas/createMany', createMany)
}