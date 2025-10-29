import { useContext } from "react";
import { SelectedTaskContext } from "../../context/SelectedTask";
import { ShowDialogDeleteContext } from "../../context/ShowDialogDeleteContext";
import { ShowDialogEditContext } from "../../context/ShowDialogEditContext";
import { ThemeContext } from "../../context/ThemeContext";
import { DeleteIcon, DoneIcon, EditIcon } from "../Icons/icons";
import "./TaskComponent.css";
import { useSnackBar } from "../../context/SnackBarContext";


const TaskComponent = ({ task, dispatch }) => {
    

    const { setShowDialogDelete } = useContext(ShowDialogDeleteContext)

    const { setShowDialogEdit } = useContext(ShowDialogEditContext)


    const { setSelectedTask } = useContext(SelectedTaskContext)

    const { showHideSnackBar } = useSnackBar()

    const [theme] = useContext(ThemeContext)

    function editStatusDone() {
        dispatch({
            type: 'toggled_done',
            payload: {
                id: task.id
            }
        })
    }

    function showDialogDeletePopup(currentTask) {
        setSelectedTask(currentTask)
        setShowDialogDelete(true)
    }

    function showDialogEditPopup(currentTask) {
        setSelectedTask(currentTask)
        setShowDialogEdit(true)
    }

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
                        editStatusDone();
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
        </div>
    );
};

export default TaskComponent;
