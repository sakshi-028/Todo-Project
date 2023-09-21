const express = require("express");
const { addingTodo, getAllTodo, updatingtodo, deleteingtodo } = require("../controllers/todo-controller");
const { authenticateUser, } = require("../middleware/authenticate");
const router = express.Router();

// here we difing route and add a contorller function
router.post("/add",authenticateUser,addingTodo);
router.get("/list",authenticateUser,getAllTodo);
router.get("/update/:id",authenticateUser,updatingtodo);
router.get("/delete/:id",authenticateUser,deleteingtodo);

module.exports = router;