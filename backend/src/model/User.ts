import mongoose from "mongoose";

enum User_name {
  ADMIN = "ADMIN",
  MENTOR_READ = "MENTOR(R)",
  MENTOR_WRITE = "MENTOR(W)",
}

interface IUser {
  name: string;
  username: string;
  role: User_name;
  mobileNo: string;
  email: string;
  password: string;
}

interface UserDoc extends mongoose.Document {
  name: string;
  username: string;
  role: User_name;
  mobileNo: string;
  email: string;
  password: string;
}

interface userModelInterface extends mongoose.Model<any> {
  build(attr: IUser): UserDoc;
}
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(User_name),
    default: User_name.MENTOR_WRITE,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdBy: { type: String },
  updatedAt: { type: Date, required: true, default: Date.now },
});

userSchema.statics.build = (attr: IUser) => {
  return new User(attr);
};

const User = mongoose.model<any, userModelInterface>("user", userSchema);

User.build({
  name: "Admin",
  username: "Admink",
  role: User_name.ADMIN,
  mobileNo: "123456789",
  email: "email",
  password: "password",
});

export { User };
