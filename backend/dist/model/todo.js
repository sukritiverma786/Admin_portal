"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
var mongoose_1 = require("mongoose");
var todoSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});
todoSchema.statics.build = function (attr) {
    return new Todo(attr);
};
var Todo = mongoose_1.default.model("Todo", todoSchema);
exports.Todo = Todo;
Todo.build({
    title: "some title",
    description: "some description",
});
