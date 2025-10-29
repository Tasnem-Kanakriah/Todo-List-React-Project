import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ShowDialogDeleteContext } from "../../context/ShowDialogDeleteContext";
import { ThemeContext } from "../../context/ThemeContext";
import { WarningIcon } from "../Icons/icons";
import './DialogDeletePopup.css';

const DialogDeletePopup = ({ onClickFunc, currentTask }) => {

    const { showDialogDelete, setShowDialogDelete } = useContext(ShowDialogDeleteContext)

    const [theme] = useContext(ThemeContext)

    const { t } = useTranslation()

    return (
        <div
            id="deletePopupOverlay"
            style={{ visibility: showDialogDelete ? "visible" : "hidden" }}
            onClick={() => {
                setShowDialogDelete(false);
            }}
            onKeyDown={(event) => {
                if (event.key === "Escape") {
                    setShowDialogDelete(false);
                }
            }}
        >
            <div
                id="popupDialogDelete"
                onClick={(event) => {
                    event.stopPropagation()
                }}
                className={theme ? "dark-theme-background dark-theme-border" : ''}
            >
                <section>
                    <span>
                        <WarningIcon />
                    </span>
                    <div>
                        <h3>{t('confirm_delete_task')}</h3>
                        <h4 className={theme ? "color-white" : ''}>"{currentTask?.taskTitle}"</h4>
                    </div>
                </section>
                <div id="popupDialogDeleteButton">
                    <button onClick={onClickFunc} id="delete_button">{t('delete')}</button>
                    <button onClick={() => {
                        setShowDialogDelete(false)
                    }} id="cancel_button">{t('cancel')}</button>
                </div>
            </div>
        </div>
    )
}

export default DialogDeletePopup