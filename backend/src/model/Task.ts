import mongoose from "mongoose";
import { isDate } from "util/types";
const Schema = mongoose.Schema;

// let TimeStamp = new Date().getTime().toString();
// let time = new Date(parseInt(TimeStamp)).toLocaleDateString();

// console.log(time);

// enum User {
//     ADMIN = "ADMIN",
//     MENTOR_READ = "MENTOR(R)",
//     MENTOR_WRITE = "MENTOR(W)",
//   }

interface DoTask {
  title: string;
  description: string;
}

interface TaskDoc extends mongoose.Document {
  title: string;
  description: string;
}

interface taskModelInterface extends mongoose.Model<any> {
  build(attr: DoTask): TaskDoc;
}

const taskschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
    min: 0,
    max: 255,
  },
  //   createdBy: Schema.name,
  createdAt: { type: Date, required: true, default: Date.now },

  //   updatedBy: Schema.name,
  updatedAt: { type: Date, required: true, default: Date.now },
  status: {
    type: String,
    default: "Active",
    enum: ["Active", "InActive", "Invited"],
  },
});

taskschema.statics.build = (attr: DoTask) => {
  return new Task(attr);
};

//   created by
// modified_at....... used in UI

const Task = mongoose.model<any, taskModelInterface>("task", taskschema);

Task.build({
  title: "Admin",
  description: "work before delay",
});

export { Task };
