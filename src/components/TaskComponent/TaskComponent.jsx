import { useContext } from "react";
import { SelectedTaskContext } from "../../context/SelectedTask";
import { ShowDialogDeleteContext } from "../../context/ShowDialogDeleteContext";
import { ShowDialogEditContext } from "../../context/ShowDialogEditContext";
// import { SnackBarContext } from "../../context/SnackBarContext";
import { TasksListContext } from "../../context/TasksListContext";
import { ThemeContext } from "../../context/ThemeContext";
import { DeleteIcon, DoneIcon, EditIcon } from "../Icons/icons";
import "./TaskComponent.css";
import { useSnackBar } from "../../context/SnackBarContext";


const TaskComponent = ({ task }) => {
    const { tasks, setTasks } = useContext(TasksListContext);

    const { setShowDialogDelete } = useContext(ShowDialogDeleteContext)

    const { setShowDialogEdit } = useContext(ShowDialogEditContext)

    // const [selectedTaskId, setSelectedTaskId] = useState(null)

    const { setSelectedTask } = useContext(SelectedTaskContext)

    // const { showHideSnackBar } = useContext(SnackBarContext)
    const { showHideSnackBar } = useSnackBar()

    // console.log(selectedTaskId);

    const [theme] = useContext(ThemeContext)

    function editStatusDone(id) {
        const newTasks = tasks.map((item) => {
            if (id === item.id) {
                return {
                    ...item,
                    isDone: !item.isDone,
                };
            }
            return item;
        });
        setTasks(newTasks);
        localStorage.setItem("tasks", JSON.stringify(newTasks))
    }

    function showDialogDeletePopup(currentTask) {
        setSelectedTask(currentTask)
        setShowDialogDelete(true)
    }

    function showDialogEditPopup(currentTask) {
        setSelectedTask(currentTask)
        setShowDialogEdit(true)
    }

    // function deleteTask() {
    //     // const newTasks = tasks.filter((item) => item.id !== selectedTaskId);
    //     const newTasks = tasks.filter((item) => {
    //         return item.id !== selectedTaskId
    //     });
    //     console.log(newTasks);
    //     setTasks(newTasks);
    //     localStorage.setItem("tasks", JSON.stringify(newTasks))
    //     setShowDialogDelete(false)
    //     setSelectedTaskId(null)
    // }

    return (
        <div id="task" className={theme ? "dark-theme-border" : "light-theme-background-white "}>
            <h2 style={{
                textDecoration: task.isDone && "line-through"
            }}>{task.taskTitle}</h2>
            <div id="task_icons">
                <DoneIcon
                    fillDoneIcon={task.isDone ? "#8ec3bd" : "#fff"}
                    fillDoneMarkIcon={task.isDone ? "#fff" : "#8ec3bd"}
                    onClickFunc={() => {
                        editStatusDone(task.id);
                        showHideSnackBar( task.isDone ? "Task not completed" : "Task completed")
                    }}
                />
                <EditIcon
                    onClickFunc={() => {
                        showDialogEditPopup(task)
                    }} />
                <DeleteIcon onClickFunc={() => {
                    showDialogDeletePopup(task);
                }}
                />
            </div>
            {/* {
                selectedTaskId === task.id && (
                    <DialogDeletePopup
                        taskTitle={task.taskTitle}
                        onClickFunc={() => {
                            deleteTask()
                        }} />
                )
            }
            {
                selectedTaskId === task.id && (
                    <DialogEditPopup currentTask={task} />
                )
            } */}
        </div>
    );
};

export default TaskComponent;
