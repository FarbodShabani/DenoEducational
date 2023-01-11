import { Application } from "https://deno.land/x/oak/mod.ts";
import { connectDB } from "./helpers/db.ts";


import todosRouter from "./routes/todos.ts";

const app = new Application();

connectDB();

app.use(async (ctx, next) => {
    ctx.response.headers.set("Access-Control-Allow-Origin", "*");
    ctx.response.headers.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    await next()
})

app.use(todosRouter.routes());
app.use(todosRouter.allowedMethods());

// app.use((ctx) => {
// ctx.response.body = "Hello dear lovely Saina!";

// });
await app.listen({ port: 2882 });