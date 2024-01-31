import express, { Request, Response, NextFunction, response } from "express";
import { User } from "../model/User";
// import { AddUser } from "../model/AddUser";
import { Task } from "../model/Task";
import bcrypt from "bcrypt";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
// import cookieParser from "cookie-parser";
import cookieParser from "cookie-parser";

export const SECRET_KEY: Secret = "your-secret-key-here";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

const router = express.Router();
router.use(cookieParser());

const saltround = 10;

router.post("/user", async (req: Request, res: Response) => {
  try {
    const {
      name,
      username,
      role,
      email,
      mobileNo,
      password,
      // createdBy,
    } = req.body;
    console.log(req.body, "reqbody");
    console.log(req.body.name, "name ");
    // const user = User.build({
    //   name,
    //   username,
    //   role,
    //   email,
    //   mobileNo,
    //   password,
    //   // createdBy,
    // });
    console.log(name, username, email, mobileNo, password, "from before");
    if (!name || !username || !email || !mobileNo || !password) {
      console.log(name, username, email, mobileNo, password, "from ui");
      return res.status(422).json({ error: "plz fill the field properly" });
    }

    let userExist = await User.findOne({ email: email });
    console.log(password, "password of the user");

    if (userExist) {
      return res.status(500).json({ error: "Email already Exist" });
    } else {
      bcrypt.hash(password, saltround, (error: any, hash: string) => {
        if (error) {
          res.send({
            success: false,
            statusCode: 500,
            message: "getting error during the connection",
          });
          return;
        }
        console.log(hash, "i am getting hash password");

        const user = new User({
          name,
          username,
          role,
          email,
          mobileNo,
          password: hash,
        });
        user.save();
        res.status(201).json({ message: "user registeres successfully" });
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    let userExist = await User.findOne({ email: email });

    if (userExist === null) {
      return res.status(400).send({
        message: "User not found.",
      });
    } else {
      if (userExist.password) {
        let hash = userExist.password;
        console.log(userExist.password);
        bcrypt.compare(password, hash, function (err, result) {
          console.log(result, "result");
          if (err) {
            return res.status(400).send({
              message: "something went wrong compare password",
            });
          }
          if (result != true) {
            return res.status(400).send({
              message: "Invalid password",
            });
          } else {
            sendToken(userExist, res);
          }
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

function sendToken(userExist: typeof User, res: Response): any {
  jwt.sign({ userExist }, SECRET_KEY, { expiresIn: "2h" }, (err, token) => {
    const cookieValue = res.cookie("token", token, { httpOnly: true });
    // console.log("Cookie Value:", cookieValue);
    if (err) {
      res.send({
        result: "something went wrong, Please try after sometime",
      });
    }
    res.send({ userExist, authToken: token });
  });
}

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;

  if (token) {
    // const verifyToken = (req.headers.authorization = `Bearer ${token}`);
    const verifyToken = (req.headers.authorization = `${token}`);
    // verifyToken.split(" ")[1];
    console.log(
      verifyToken,
      "this is come form verifyToken___________________________________"
    );
    console.warn("middleware called", token);
    jwt.verify(token, SECRET_KEY, (err: any, valid: any) => {
      if (err) {
        res.status(401).json({ result: "Please Provide valid token" });
      } else {
        console.log(valid.userExist, "msg");
        res.locals.user = valid.userExist;
        next();
      }
    });
  } else {
    res.status(403).json({ result: "Please add token with header" });
  }
}
router.get("/users", async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  // page is accepting from frontend in req.query
  const pageSize = 4;
  try {
    const totalUsersCount = await User.countDocuments();
    const totalPages = Math.ceil(totalUsersCount / pageSize);

    // Calculate the skip value based on the current page
    const skip = (page - 1) * pageSize;

    const users = await User.find().limit(pageSize).skip(skip);
    // Retrieve users for the current page with the specified limit and skip

    res.json({ users, totalPages });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
});

// ............................................Crud.......mentor...................................
router.post("/addUser", verifyToken, async (req: Request, res: Response) => {
  enum User_name {
    ADMIN = "ADMIN",
    MENTOR_READ = "MENTOR(R)",
    MENTOR_WRITE = "MENTOR(W)",
  }
  try {
    const { name, username, role, email, mobileNo, password } = req.body;
    let userExist = await User.findOne({ email: email });
    const userInformation = res.locals.user;
    const roleOf = User_name.MENTOR_READ;
    if (userInformation.role == roleOf) {
      console.log(true, roleOf, userInformation.role, "decoded user");
      res.status(401).json({ Exception: " You can't add a User" });
    } else {
      if (!name || !username || !email || !mobileNo || !password) {
        return res.status(422).json({ error: "plz fill the field properly" });
      }

      if (userExist) {
        return res.status(500).json({ error: "User already Exist" });
      } else {
        bcrypt.hash(password, saltround, (error: any, hash: string) => {
          if (error) {
            res.send({
              success: false,
              statusCode: 500,
              message: "getting error during the connection",
            });
            return;
          }
          const user = new User({
            name,
            username,
            role,
            email,
            mobileNo,
            password: hash,
            createdBy: userInformation.name,
          });
          user.save();
          // user.createdBy.save();
          // res.status(201).json({ message: "user registeres successfully" });
          res.status(201).json({ user });
          console.log(user, userInformation.name);
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

// what i can change in get user id
router.get("/userInfo/:id", async (req: Request, res: Response) => {
  let result = await User.findOne({ _id: req.params.id });
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send({ result: "Record not found" });
  }
  console.log(result);
});

router.put("/user/:id", async (req: Request, res: Response) => {
  try {
    const { name, username, email, mobileNo, password } = req.body;
    // if (!name || !username || !email || !mobileNo || !password) {
    //   return res.status(422).json({ error: "plz fill the field properly" });
    // } else {
    if (name || username || email || mobileNo || password) {
      let result = await User.updateOne(
        { _id: req.params.id },

        {
          $set: req.body,
        }
      );
      res.send(result);
      console.log("updated");
    } else {
      return res.status(422).json({ error: "plz fill the field properly" });
    }
  } catch (err) {
    console.log(err);
  }
});

// router.put("/users/:id", (req: Request, res: Response) => {
//   const userId = parseInt(req.params.id);
//   const { name, username, mobileNo } = req.body;

//   const userToUpdate = User.find((user) => user.id === userId);

//   if (!userToUpdate) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   if (name) {
//     userToUpdate.name = name;
//   }

//   if (username) {
//     userToUpdate.username = username;
//   }

//   if (mobileNo) {
//     userToUpdate.mobileNo = mobileNo;
//   }

//   res.json(userToUpdate);
// });

router.delete("/remove/:id", async (req: Request, res: Response) => {
  try {
    let user = await User.findOne({ _id: req.params.id });
    if (user) {
      const result = await User.deleteOne({ _id: req.params.id });
      res.status(200).send(result);
    }
  } catch (err) {
    res.status(401).json({ Error: "please provide valid user" });
    console.log(err);
  }
});

router.get("/search/:key", async (req: Request, res: Response) => {
  let result = await User.find({
    $or: [
      { name: { $regex: req.params.key } },
      { email: { $regex: req.params.key } },
      { username: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

// ............................................Task code...................................

router.post("/task/id", async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      res.status(422).json({ error: "plz fill the field properly" });
    } else {
      const TaskForUser = Task.build({
        title,
        description,
      });
      const taskSet = new Task({
        title,
        description,
      });

      const todo = await taskSet.save();
      if (todo) {
        // res.status(200).send({ result:"task created" });
        res.status(200).send(todo);
      } else {
        res.status(401).send({
          result: "Something is wrong",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

// ...........................................Crud.......Task...................................

router.get("/task/:id", async (req: Request, res: Response) => {
  try {
    let result = await Task.findOne({ _id: req.params.id });
    if (result) {
      return res.status(200).json(result);
    } else {
      res.status(404).send({ result: "Record not found" });
    }
    console.log(result);
  } catch (err) {
    console.log(err);
  }
});

router.post("/add-task", async (req: Request, res: Response) => {
  try {
    let task = new Task(req.body);
    let result = await task.save();
    if (result) {
      return res.status(200).json(result);
    }
    console.log(result, "i have added a new Task");
  } catch (err) {
    console.log(err);
  }
});

router.put("/updateUser/:id", async (req: Request, res: Response) => {
  try {
    let result = await Task.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
  console.log("updated");
});

router.delete("/DeleteUser/:id", async (req: Request, res: Response) => {
  const result = await Task.deleteOne({ _id: req.params.id });
  return res.status(200).send(result);
});

export { router as todoRoute };
