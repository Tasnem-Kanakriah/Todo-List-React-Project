import { useContext, useState } from "react";
import { ShowDialogDeleteContext } from "../../context/ShowDialogDeleteContext";
import { ShowDialogEditContext } from "../../context/ShowDialogEditContext";
import { TasksListContext } from "../../context/TasksListContext";
import DialogDeletePopup from "../DialogDeletePopup/DialogDeletePopup";
import DialogEditPopup from "../DialogEditPopup/DialogEditPopup";
import { DeleteIcon, DoneIcon, EditIcon } from "../Icons/icons";
import "./TaskComponent.css";
import { ThemeContext } from "../../context/ThemeContext";

const TaskComponent = ({ task }) => {
    const { tasks, setTasks } = useContext(TasksListContext);

    const { setShowDialogDelete } = useContext(ShowDialogDeleteContext)

    const { setShowDialogEdit } = useContext(ShowDialogEditContext)

    const [selectedTaskId, setSelectedTaskId] = useState(null)

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

    function showDialogDeletePopup(id) {
        setSelectedTaskId(id)
        setShowDialogDelete(true)
    }

    function showDialogEditPopup(id) {
        setSelectedTaskId(id)
        setShowDialogEdit(true)
    }

    function deleteTask() {
        // const newTasks = tasks.filter((item) => item.id !== selectedTaskId);
        const newTasks = tasks.filter((item) => {
            return item.id !== selectedTaskId
        });
        console.log(newTasks);
        setTasks(newTasks);
        localStorage.setItem("tasks", JSON.stringify(newTasks))
        setShowDialogDelete(false)
        setSelectedTaskId(null)
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
                        editStatusDone(task.id);
                    }}
                />
                <EditIcon
                    onClickFunc={() => {
                        showDialogEditPopup(task.id)
                    }} />
                <DeleteIcon onClickFunc={() => {
                    showDialogDeletePopup(task.id);
                }}
                />
            </div>
            {
                selectedTaskId === task.id && (
                    <DialogDeletePopup
                        taskTitle={task.taskTitle}
                        onClickFunc={() => {
                            deleteTask(task.id)
                        }} />
                )
            }
            {
                selectedTaskId === task.id && (
                    <DialogEditPopup currentTask={task} />
                )
            }
        </div>
    );
};

export default TaskComponent;
