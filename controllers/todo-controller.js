const Todo = require("../models/todo-model");

//getting all data 
module.exports = {
    addingTodo: async (req, res, next) => {
        try {
            console.log(req.body);
            const addTodo = new Todo(req.body);
            const {todo} = await addTodo.save();
            res.send({
                msg:"Item Added.",
                data:{todo}
            });
        }
        catch (error) {
            res.status(400).send({
                msg: error.message
            })
        }

    },
    getAllTodo: async (req, res, next) => {
        try {
            const alltodoData = await Todo.find();
            if (!alltodoData) {
                return res.status(400).send("items not created.")
            }
            if(alltodoData){
           return res.send({alltodoData});
            }
        }
        catch (error) {
            res.status(400).send({
                msg: error.message
            })
        }
    },
    //updating todo by their id
    updatingtodo: async (req, res, next) => {
        try {
            const _id = req.params.id;
            // take data from client from json
            const updateTodo = req.body;
            const newTodo = await Todo.findByIdAndUpdate(_id,updateTodo,{
                new:true,
            })
            res.send({
                msg:"Item Updated",
                data: newTodo
            });

            console.log(newTodo);
        }
        catch (error) {
            res.status(400).send({
                msg: error.message
            })
        }

    },

    deleteingtodo: async (req, res, next) => {
        try{
            const _id = req.params.id;
            const deleteTodo = await Todo.findByIdAndDelete(_id);
            res.send("deleted successfully");
            console.log(deleteTodo);
        }        
        catch (error) {
            res.status(400).send({
                msg: error.message
            })
        }

    }

}