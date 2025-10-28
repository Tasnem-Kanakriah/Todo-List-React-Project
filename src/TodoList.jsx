import { useContext, useMemo } from "react";
import TaskComponent from "../src/components/TaskComponent/TaskComponent";
import "./TodoList.css";
import AddTaskComponent from "./components/AddTaskComponent/AddTaskComponent";
import DialogDeletePopup from "./components/DialogDeletePopup/DialogDeletePopup";
import DialogEditPopup from "./components/DialogEditPopup/DialogEditPopup";
import { ThemeIcon, TodoIcon } from "./components/Icons/icons";
import TasksStatus from "./components/TasksStatus/TasksStatus";
import { SelectedTaskContext } from "./context/SelectedTask";
import { ShowDialogDeleteContext } from "./context/ShowDialogDeleteContext";
// import { SnackBarContext } from "./context/SnackBarContext";
import { TasksListContext } from "./context/TasksListContext";
import { TasksStatusContext } from "./context/TasksStatusContext";
import { useSnackBar } from "./context/SnackBarContext";

const TodoList = () => {

    const { tasks, setTasks } = useContext(TasksListContext)
    const { taskStatus } = useContext(TasksStatusContext)
    // const { showHideSnackBar } = useContext(SnackBarContext)
    const { showHideSnackBar } = useSnackBar()

    // ! طريقتي ! //
    // let tasksList = tasks;

    // if (taskStatus.doneIsClicked) {
    //     console.log("done");

    //     tasksList = tasks.filter(task => task.isDone)
    // }

    // if (taskStatus.undoneIsClicked) {
    //     tasksList = tasks.filter(task => !task.isDone)
    // }

    // const TasksListComponent = (tasksList || []).map(task => (
    //     <TaskComponent key={task.id} task={task} />
    // ))
    // console.log(tasksList.length);

    // ! طريقة الأستاذ يعرب ! //
    // let tasksList = tasks;

    // let completed = tasks.filter(task => task.isDone) 
    // let notCompleted = tasks.filter(task => !task.isDone) 

    // if (taskStatus.doneIsClicked) {
    //     tasksList = completed
    // }

    // if (taskStatus.undoneIsClicked) {
    //     tasksList = notCompleted
    // }

    // const TasksListComponent = (tasksList || []).map(task => (
    //     <TaskComponent key={task.id} task={task} />
    // ))

    // ! useMemo باستخدام  ! //

    let tasksList = tasks;

    let completed = useMemo(() => {
        return tasks.filter(task => task.isDone)
    }, [tasks])

    let notCompleted = useMemo(() => {
        return tasks.filter(task => !task.isDone)
    }, [tasks])
    if (taskStatus.doneIsClicked) {
        tasksList = completed
    }
    if (taskStatus.undoneIsClicked) {
        tasksList = notCompleted
    }
    const TasksListComponent = (tasksList || []).map(task => (
        <TaskComponent key={task.id} task={task} />
    ))

    const { selectedTask, setSelectedTask } = useContext(SelectedTaskContext)
    const { setShowDialogDelete } = useContext(ShowDialogDeleteContext)

    // console.log(selectedTask);

    function deleteTask() {
        // const newTasks = tasks.filter((item) => item.id !== selectedTask);
        const newTasks = tasks.filter((item) => {
            return item.id !== selectedTask.id
        });
        console.log(newTasks);
        setTasks(newTasks);
        localStorage.setItem("tasks", JSON.stringify(newTasks))
        setShowDialogDelete(false)
        setSelectedTask(null)
    }

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
            <DialogDeletePopup
                onClickFunc={() => {
                    deleteTask()
                    showHideSnackBar("Task was deleted")
                }}
                currentTask={selectedTask}
            />
            <DialogEditPopup
                currentTask={selectedTask} />
        </>
    );
};

export default TodoList;
