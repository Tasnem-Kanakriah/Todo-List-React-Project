import {
    v4 as uuid4
} from "uuid";

export default function taskReducer(currentTasks, action) {

    switch (action.type) {
        case 'added': {
            if (action.payload.title !== "") {
                const newTask = {
                    id: uuid4(),
                    taskTitle: action.payload.title,
                    isDone: false
                }
                return [...currentTasks, newTask]
            }
            break
        }
        case 'get-all-tasks': {
            return action.payload
        }
        case 'deleted': {
            return currentTasks.filter(task => task.id !== action.payload.id);
        }
        case 'updated': {
            return currentTasks.map(task => {
                if (task.id === action.payload.id) {
                    return {
                        ...task,
                        taskTitle: action.payload.newTitle
                    };
                }
                return task;
            });
        }
        case 'toggled_done': {
            return currentTasks.map(task => {
                if (task.id === action.payload.id) {
                    return {
                        ...task,
                        isDone: !task.isDone
                    };
                }
                return task;
            });
        }
        default: {
            throw Error("Unknown Action" + action.type)
        }
    }
}