import { FastifyInstance } from "fastify";
import { register } from "./register";
import { update } from "./update";
import { deleteUser } from "./delete";
import { get } from "./get";
import { authenticate } from "./authenticate";

export async function userRoutes(app:FastifyInstance) {
    app.post('/users', register)
    app.patch('/users/:userId', update)
    app.delete('/users/:userId', deleteUser)
    app.get('/users/:userId', get)
    app.post('/authenticate', authenticate)
}