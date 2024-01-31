"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var todo_1 = require("./routes/todo");
var Port = 3000;
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", todo_1.todoRouter);
// const connectDB = async () => {
//   const database = await mongoose.connect(
//     "mongodb://127.0.0.1:27017/Admin&menter"
//   );
//     // const todoSchema = new mongoose.Schema({});
//     // const todo = mongoose.model("Todo", todoSchema);
//     const data = await Todo.find();
//     console.warn(data);
//     console.log(data, "this my product");
//     console.log("hello mongoose");
// };
// mongoose.set("strictQuery", false);
// connectDB();
// app.get("/", (req: Request, res: Response) => {
//   res.send("hello from express + ts ");
// });
app.listen(Port, function () {
    console.log("app Listining");
});
