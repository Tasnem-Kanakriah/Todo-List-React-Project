import { useContext, useEffect, useMemo, useReducer } from "react";
import TaskComponent from "../src/components/TaskComponent/TaskComponent";
import "./TodoList.css";
import AddTaskComponent from "./components/AddTaskComponent/AddTaskComponent";
import DialogDeletePopup from "./components/DialogDeletePopup/DialogDeletePopup";
import DialogEditPopup from "./components/DialogEditPopup/DialogEditPopup";
import { ThemeIcon, TodoIcon } from "./components/Icons/icons";
import TasksStatus from "./components/TasksStatus/TasksStatus";
import { SelectedTaskContext } from "./context/SelectedTask";
import { ShowDialogDeleteContext } from "./context/ShowDialogDeleteContext";
import { useSnackBar } from "./context/SnackBarContext";
import { TasksStatusContext } from "./context/TasksStatusContext";
import tasksReducer from "./reducers/tasksReducer";

const initializer = () => {
    const storageTasks = localStorage.getItem("tasks");
    return storageTasks ? JSON.parse(storageTasks) : [];
};

const TodoList = () => {
    const { taskStatus } = useContext(TasksStatusContext)
    const { showHideSnackBar } = useSnackBar()
    const { selectedTask, setSelectedTask } = useContext(SelectedTaskContext)
    const { setShowDialogDelete } = useContext(ShowDialogDeleteContext)

    const [tasks2, dispatch] = useReducer(tasksReducer, [], initializer)

    console.log(tasks2);

    useEffect(() => {
        const storageTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        dispatch({ type: 'get-all-tasks', payload: storageTasks });
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks2));
    }, [tasks2]);

    
    let completed = useMemo(() => {
        return tasks2.filter(task => task.isDone)
    }, [tasks2])
    
    let notCompleted = useMemo(() => {
        return tasks2.filter(task => !task.isDone)
    }, [tasks2])
    
    let tasksList = tasks2;
    
    if (taskStatus.doneIsClicked) {
        tasksList = completed
    }
    if (taskStatus.undoneIsClicked) {
        tasksList = notCompleted
    }

    function deleteTask() {
        dispatch({
            type: 'deleted',
            payload: {
                id: selectedTask.id
            }
        })

        setShowDialogDelete(false)
        setSelectedTask(null)
    }

    const TasksListComponent = (tasksList || []).map(task => (
        <TaskComponent key={task.id} task={task} dispatch={dispatch} />
    ))

    return (
        <>
            <span id="theme_icon">
                <ThemeIcon />
            </span>
            <h1>
                To Do List <TodoIcon />
            </h1>
            <AddTaskComponent dispatch={dispatch} />
            <TasksStatus />
            <div id="tasks_container" style={{
                border: (tasksList.length === 0) ? "none" : "3px solid #dfb046"
            }}>
                {TasksListComponent}
            </div>
            <DialogDeletePopup
                onClickFunc={() => {
                    deleteTask()
                    showHideSnackBar("Task was deleted")
                }}
                currentTask={selectedTask}
            />
            <DialogEditPopup
                currentTask={selectedTask}
                dispatch={dispatch}
            />
        </>
    );
};

export default TodoList;
