import { useContext, useEffect, useState } from "react";
import { ShowDialogEditContext } from "../../context/ShowDialogEditContext";
import { ThemeContext } from "../../context/ThemeContext";
import { RenameIcon } from "../Icons/icons";
import './DialogEditPopup.css';
import { useSnackBar } from "../../context/SnackBarContext";

const DialogEditPopup = ({ currentTask, dispatch }) => {

    const [updateTaskTitle, setUpdateTaskTitle] = useState(currentTask?.taskTitle || "")

    const { showDialogEdit, setShowDialogEdit } = useContext(ShowDialogEditContext)

        const { showHideSnackBar } = useSnackBar()

    const [theme] = useContext(ThemeContext)


    function renameTask() {
        dispatch({
            type: 'updated',
            payload: {
                id: currentTask.id,
                newTitle: updateTaskTitle
            }
        })
    }

    useEffect(() => {
        setUpdateTaskTitle(currentTask?.taskTitle || "");
    }, [currentTask]);

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
                        showHideSnackBar("Task was Edit")
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