import { useContext } from "react";
import TaskComponent from "../src/components/TaskComponent/TaskComponent";
import "./TodoList.css";
import AddTaskComponent from "./components/AddTaskComponent/AddTaskComponent";
import { ThemeIcon, TodoIcon } from "./components/Icons/icons";
import TasksStatus from "./components/TasksStatus/TasksStatus";
import { TasksListContext } from "./context/TasksListContext";
import { TasksStatusContext } from "./context/TasksStatusContext";

const TodoList = () => {

    const { tasks } = useContext(TasksListContext)
    const { taskStatus } = useContext(TasksStatusContext)

    let tasksList = tasks;

    if (taskStatus.doneIsClicked) {
        tasksList = tasks.filter(task => task.isDone)
    }

    if (taskStatus.undoneIsClicked) {
        tasksList = tasks.filter(task => !task.isDone)
    }

    const TasksListComponent = (tasksList || []).map(task => (
        <TaskComponent key={task.id} task={task} />
    ))
    // console.log(tasksList.length);
    

    return (
        <>
            <span id="theme_icon">
                <ThemeIcon />
            </span>
            <h1>
                To Do List <TodoIcon />
            </h1>
            <AddTaskComponent />
            <TasksStatus />
            <div id="tasks_container" style={{
                border: (tasksList.length === 0) ? "none" : "3px solid #dfb046"
            }}>
                {TasksListComponent}
            </div>
        </>
    );
};

export default TodoList;
