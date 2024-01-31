//import express, { Express } from "express";
import express, {
  Request,
  Response,
  NextFunction,
  response,
  Express,
} from "express";
require("./config");
import { todoRouter } from "./routes/Todo";
import { todoRoute } from "./routes/User";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

const Port = 4000;

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", todoRoute);
app.use("/api", todoRouter);

// const connectDB = async () => {
//   // const database = await mongoose.connect(
//   //   "mongodb://127.0.0.1:27017/Admin&menter"
//   // );
//   const Admin_data = await Admin.find();
//   console.log(Admin_data, "Admin data");
//   const data = await Todo.find();
//   console.warn(data);
//   console.log(data, "this my product");
//   console.log("hello mongoose");
// };
mongoose.set("strictQuery", false);

// connectDB();

// app.get("/", (req: Request, res: Response) => {
//   res.send("hello from express + ts ");
// });

// app.post("/t", (req: Request, res: Response) => {
//   console.log(req.body, "console body");
//   // let t = JSON.parse(req.body);
//   //console.log(t, "console name");
//   console.log(req.body.name, "log name");
//   res.send("hello from express + ts ");
// });

app.listen(Port, () => {
  console.log("app Listining", Port);
});
