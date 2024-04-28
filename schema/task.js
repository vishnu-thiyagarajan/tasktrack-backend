const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const TaskSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Todo', 'Onit', 'Done'],
      default: 'Todo'
    },
    project: {
        type: Schema.Types.ObjectId, 
        ref: 'projects', 
        required: true 
    }
});

const TaskModel = mongoose.model("tasks", TaskSchema);

module.exports = {TaskModel, TaskSchema}