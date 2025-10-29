import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./AddTaskComponent.css";

const AddTaskComponent = ({ dispatch }) => {    
    const [newTask, setNewTask] = useState({ id: null, taskTitle: "" });

    const [theme] = useContext(ThemeContext)

    function addNewTask() {
        dispatch({
            type: 'added',
            payload: {
                title: newTask.taskTitle
            }
        })
        setNewTask({ taskTitle: "" });
    }

    return (
        <div id="add_task_div">
            <input
                id="add_task"
                type="text"
                className={theme ? "dark-theme-background dark-theme-background-white" : "light-theme-background-white"}
                placeholder="Add a new task"
                value={newTask.taskTitle}
                onChange={(event) => {
                    setNewTask((prev) => ({ ...prev, taskTitle: event.target.value }))
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        addNewTask()
                    }
                }}
            />
            <button
                className={theme ? "color-white" : ""}
                id="add_button"
                onClick={addNewTask}
            >
                Add
            </button>
        </div>
    );
};

export default AddTaskComponent;