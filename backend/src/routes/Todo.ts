import express, { Request, Response } from "express";
// import { Todo } from "../model/todo";
import { Task } from "../model/Task";
import { body, validationResult } from "express-validator";
const router = express.Router();

router.get("/todo", [], async (req: Request, res: Response) => {
  const todo = await Task.find({});
  return res.send("the todo");
});

// router.post("/todo", async (req: Request, res: Response) => {
//   try {
//     const { title, description } = req.body;
//     console.log(title, "msg");
//     console.log(description, "msg3");
//     const todo = Todo.build({ title, description });
//     await todo.save();
//     return res.status(201).send({ message: "Here your work to do", todo });

//   } catch (error) {
//     console.log(error, "message:error");

//   }
// });

// const validateTodo = [
//   body("title").notEmpty().withMessage("Title is required"),
//   body("description").notEmpty().withMessage("Description is required"),
// ];

router.post("/task", async (req: Request, res: Response) => {
  try {
    body("title").notEmpty().withMessage("Title is required"),
      body("description").notEmpty().withMessage("Description is required");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description } = req.body;
    console.log(title, description);
    const todo = new Task({ title, description });
    await todo.save();

    return res.status(201).json({ message: "Here is your work to do", todo });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

// try {
//   const { title, description } = req.body;
//   if (!title || !description) {
//     res.status(422).json({ error: "plz fill the field properly" });
//   } else {
//     const TaskForUser = Task.build({
//       title,
//       description,
//     });
//     const taskSet = new Task({
//       title,
//       description,
//     });

//     const todo = await taskSet.save();
//     if (todo) {
//       // res.status(200).send({ result:"task created" });
//       res.status(200).send(todo);
//     } else {
//       res.status(401).send({
//         result: "Something is wrong",
//       });
//     }
//   }
// } catch (err) {
//   console.log(err);
// }
export { router as todoRouter };
