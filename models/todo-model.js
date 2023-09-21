const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    todo: {
        type: "string",
        required: true,
    }
})
module.exports =  mongoose.model("TODO" , todoSchema);
