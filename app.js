const express = require("express")
const router = express.Router();
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 4001

const userRouter = require("./routes/user-route");
const todoRouter = require("./routes/todo-route");


mongoose.connect("mongodb://127.0.0.1:27017/AddingTodo")
    .then(() => {
        console.log("Database connected successfully.")
    })
    .catch((err) => {
        console.log(err);
    })


//middilewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// using controller file
app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);


app.get("/", (req, res) => {
    res.send("Hello from express.");
})

app.listen(PORT, () => {
    console.log("app is listening on port", PORT);
})