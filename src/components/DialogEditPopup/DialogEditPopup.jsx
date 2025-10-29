import { useContext, useEffect, useState } from "react";
import { ShowDialogEditContext } from "../../context/ShowDialogEditContext";
import { useSnackBar } from "../../context/SnackBarContext";
import { ThemeContext } from "../../context/ThemeContext";
import { RenameIcon } from "../Icons/icons";
import './DialogEditPopup.css';

import { useTranslation } from "react-i18next";

const DialogEditPopup = ({ currentTask, dispatch }) => {

    const [updateTaskTitle, setUpdateTaskTitle] = useState(currentTask?.taskTitle || "")

    const { showDialogEdit, setShowDialogEdit } = useContext(ShowDialogEditContext)

    const { showHideSnackBar } = useSnackBar()

    const [theme] = useContext(ThemeContext)

    const { t } = useTranslation()


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
                        <h3>{t('rename_task')}</h3>
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
                        showHideSnackBar(t('task_edited'))
                    }} id="edit_button">{t('save')}</button>
                    <button onClick={() => {
                        setShowDialogEdit(false)
                    }} id="cancel_button">{t('cancel')}</button>
                </div>
            </div>
        </div>
    )
}

export default DialogEditPopup