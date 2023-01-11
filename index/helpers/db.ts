import {MongoClient, Bson, Database, ObjectId} from "https://deno.land/x/mongo@v0.31.1/mod.ts"

const client = new MongoClient();

interface mongoTodo {
    _id: ObjectId,
    text: String,
  }

  
interface Todo {
    id?: string;
    text: string;
  }

const user: string = "farbodSaina"
const pass: string = "puma1999sh"
const cluster: string = "cluster0.riyzl.mongodb.net"

let db: Database;

const connectDB = async () => {
    await client.connect(`mongodb+srv://${user}:${pass}@${cluster}/?retryWrites=true&w=majority&authMechanism=SCRAM-SHA-1&authSource=admin`)
    db = client.database("todos_app");
    console.log("Database is connected and fetched");
}

const getMongoTodos =async () => {
    const todoCollection = db.collection<mongoTodo>("todos");
    const fetchedTodos: [mongoTodo] = await todoCollection.find().toArray();
    const transformedTodos = fetchedTodos.map((todo: mongoTodo) => {
        return {id: todo._id.toString(), text: todo.text};
      });
    return transformedTodos;
}
const postMongoTodo =async (todo: Todo) => {
    const todoCollection = db.collection<mongoTodo>("todos");
    
    const todoId: ObjectId = await todoCollection.insertOne(todo);
    
    return todoId.$oid;
}

const putMongoTodo =async (todo: Todo) => {
    const todoCollection = db.collection<mongoTodo>("todos");
    
    await todoCollection.updateOne({_id: new ObjectId(todo.id)}, {$set: {text: todo.text}});
    
    return true;
}

const deleteMongoTodo =async (todoId:string) => {
    const todoCollection = db.collection<mongoTodo>("todos");
    
    await todoCollection.deleteOne({_id: new ObjectId(todoId)});
    
    return true;
}


export {
    connectDB,
    getMongoTodos,
    postMongoTodo,
    putMongoTodo, 
    deleteMongoTodo
}


// interface Record {
//     name: string;
//     year: number;
// }


// const insertedIds = await records.insertMany([
//     { name: "Blue", year: 2000 },
//     { name: "Red", year: 2001 },
//     { name: "Green", year: 2002 },
// ]);

// console.log(await records.find().toArray())
