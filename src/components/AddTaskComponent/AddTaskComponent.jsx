import { useContext, useEffect, useState } from "react";
import { v4 as uuid4 } from "uuid";
import { TasksListContext } from "../../context/TasksListContext";
import "./AddTaskComponent.css";
import { ThemeContext } from "../../context/ThemeContext";

const AddTaskComponent = () => {
    const [newTask, setNewTask] = useState({ id: null, taskTitle: "" });
    const { tasks, setTasks } = useContext(TasksListContext);

    const [theme] = useContext(ThemeContext)

    function addNewTask() {
        if (newTask.taskTitle !== "") {
            const addToNewArrayTasks = [...tasks, newTask]
            // setTasks((prev) => [...prev, newTask]);
            setTasks(addToNewArrayTasks);
            localStorage.setItem("tasks", JSON.stringify(addToNewArrayTasks))
            setNewTask({ id: null, taskTitle: "" });
        }
        // console.log(newTask);
    }

    // const storageTasks = JSON.parse(localStorage.getItem("tasks"))
    // console.log("Tasks from Local Storage");    
    // console.log(storageTasks);

    // useEffect(() => {
    // console.log('hello');
    // }, [newTask.taskTitle])
    
    // ! ============================== ! /
    
    // useEffect(() => {
    //     console.log('hello');
    //     const storageTasks = JSON.parse(localStorage.getItem("tasks"))
    //     setTasks(storageTasks)
    // }, [])
    
    useEffect(() => {
        console.log('hello');
        const storageTasks = JSON.parse(localStorage.getItem("tasks")) || []
        setTasks(storageTasks)
    }, [setTasks])

    return (
        <div id="add_task_div">
            <input
                id="add_task"
                type="text"
                className={theme ? "dark-theme-background dark-theme-background-white" : "light-theme-background-white" }
                placeholder="Add new task"
                value={newTask.taskTitle}
                onChange={(event) => {
                    setNewTask((prev) => ({
                        ...prev,
                        id: uuid4(),
                        taskTitle: event.target.value,
                    }));
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        addNewTask()
                    }
                }}
            />
            <button className={theme ? "color-white" : ""} id="add_button" onClick={addNewTask}>
                Add
            </button>
        </div>
    );
};

export default AddTaskComponent;
