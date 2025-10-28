import { useContext } from "react";
import { ShowDialogDeleteContext } from "../../context/ShowDialogDeleteContext";
import { ThemeContext } from "../../context/ThemeContext";
import { WarningIcon } from "../Icons/icons";
import './DialogDeletePopup.css';

const DialogDeletePopup = ({ onClickFunc, currentTask }) => {

    const { showDialogDelete, setShowDialogDelete } = useContext(ShowDialogDeleteContext)

    const [theme] = useContext(ThemeContext)

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
                        <h3>Confirm task deletion?</h3>
                        <h4 className={theme ? "color-white" : ''}>"{currentTask?.taskTitle}"</h4>
                    </div>
                </section>
                <div id="popupDialogDeleteButton">
                    <button onClick={onClickFunc} id="delete_button">Delete</button>
                    <button onClick={() => {
                        setShowDialogDelete(false)
                    }} id="cancel_button">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DialogDeletePopup