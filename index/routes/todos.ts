import { ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";

import { Router } from "https://deno.land/x/oak/mod.ts";
import { getMongoTodos, postMongoTodo, putMongoTodo, deleteMongoTodo } from "../helpers/db.ts";

const router = new Router();

interface Todo {
  id?: string;
  text: string;
}

interface mongoTodo {
  _id: ObjectId,
  text: String,
}

let todos: Todo[] = [];

router.get("/todos", async (ctx: any) => {
  const {response} = ctx;
  const fetchedTodos = await getMongoTodos();
  response.body = {todos: fetchedTodos, message: "successfully fetched"}
});

router.post("/todos", async (ctx: any) => {
  const {request, response} = ctx;
  const data = await request.body().value;
  const newTodo: Todo = {
    text: data.text
  };
  newTodo.id = await postMongoTodo(newTodo);
  response.body = { todo: newTodo, message: "new list" };
});

router.put("/todos/:todoId", async (ctx: any) => {
  const todoId = ctx.params.todoId;
  const data = await ctx.request.body().value;
  
  const updatedTodo: Todo = {
    text: data.text,
    id: todoId
  }
  await putMongoTodo(updatedTodo);
  ctx.response.body = {  message: "updated list" };
});

router.delete("/todos/:todoId", async (ctx: any) => {
  const todoId = ctx.params.todoId;
  await deleteMongoTodo(todoId)
  ctx.response.body = { message: "successfully deleted" };
});

export default router;
