import { useContext, useState } from "react";
import { ShowDialogEditContext } from "../../context/ShowDialogEditContext";
import { TasksListContext } from "../../context/TasksListContext";
import { ThemeContext } from "../../context/ThemeContext";
import { RenameIcon } from "../Icons/icons";
import './DialogEditPopup.css';

const DialogEditPopup = ({ currentTask }) => {
    // console.log(currentTask);

    const { tasks, setTasks } = useContext(TasksListContext);

    const [updateTaskTitle, setUpdateTaskTitle] = useState(currentTask.taskTitle)

    const { showDialogEdit, setShowDialogEdit } = useContext(ShowDialogEditContext)

    const [theme] = useContext(ThemeContext)

    function renameTask() {
        const newTasks = tasks.map((item) => {
            if (item.id === currentTask.id) {
                return {
                    ...item,
                    taskTitle: updateTaskTitle
                }
            }
            return item;
        })
        console.log(newTasks);
        setTasks(newTasks);
        localStorage.setItem("tasks", JSON.stringify(newTasks))
    }

    return (
        <div
            id="editPopupOverlay"
            style={{ visibility: showDialogEdit ? "visible" : "hidden" }}
            onClick={() => {
                setShowDialogEdit(false);
            }}
        >
            <div
                className={theme ? "dark-theme-background dark-theme-border" : ''}
                id="popupDialogEdit" onClick={(event) => event.stopPropagation()}>
                <section>
                    <span>
                        <RenameIcon />
                    </span>
                    <div>
                        <h3>Rename Task!</h3>
                        <input
                            id="rename_task"
                            type="text"
                            value={updateTaskTitle}
                            onChange={(event) => {
                                setUpdateTaskTitle(event.target.value)
                            }}
                        />
                    </div>
                </section>
                <div id="popupDialogEditButton">
                    <button onClick={() => {
                        renameTask()
                        setShowDialogEdit(false);
                    }} id="edit_button">Save</button>
                    <button onClick={() => {
                        setShowDialogEdit(false)
                    }} id="cancel_button">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DialogEditPopup