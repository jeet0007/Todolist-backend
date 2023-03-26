const express = require("express");

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const todoList = [];

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/todoList", function (req, res) {
  res.send({ data: todoList });
});

app.patch("/todoList/:id", function (req, res) {
  const id = req.params.id;
  const data = req.body;
  const updatedTodo = {
    id: id,
    text: data.text,
    completed: data.completed,
  };
  console.log({ updatedTodo, todoList });
  let updated = false;
  todoList.forEach((item, index) => {
    if (item.id == updatedTodo.id) {
      updated = true;
      todoList[index] = updatedTodo;
    }
  });
  res.send({ success: updated });
});

app.delete("/todoList/:id", function (req, res) {
  const id = req.params.id;
  let updated = false;
  todoList.forEach((item, index) => {
    if (item.id == id) {
      todoList.splice(index, 1);
      updated = true;
    }
  });
  res.send({ success: updated });
});

app.post("/todoList", function (req, res) {
  console.log(req.body);
  todoList.push({
    id: todoList.length + 1,
    text: req?.body?.text,
    done: false,
  });
  res.status(200).send();
});

app.listen(3000, "localhost", () => {
  console.log("started on 3000");
});
