import { Schema, model, Types } from 'mongoose';

const taskSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    completed: {
		type: Boolean,
		default: false,
		required: true
    },
});

const Task = model('Task', taskSchema);
export default Task;
