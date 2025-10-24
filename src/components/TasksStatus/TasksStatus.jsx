import { useContext } from "react";
import { TasksStatusContext } from "../../context/TasksStatusContext";
import { ThemeContext } from "../../context/ThemeContext";
import './TasksStatus.css';

const TasksStatus = () => {

    const { taskStatus, setTaskStatus } = useContext(TasksStatusContext)

    const [theme] = useContext(ThemeContext)

    return (
        <div id="status_tasks">
            <button
                data-theme={theme ? "dark" : "light"}
                style={{
                    // backgroundColor: taskStatus.allIsClicked && "#dfb046",
                    color: taskStatus.allIsClicked && "#fff",
                    border: taskStatus.allIsClicked ? "none" : "3px solid #dfb046"
                }}
                className={taskStatus.allIsClicked ? "active" : ""}
                onClick={() => {
                    setTaskStatus({
                        allIsClicked: true,
                        doneIsClicked: false,
                        undoneIsClicked: false
                    })
                }}
                id="all_tasks_button"
            >
                All
            </button>
            <button
                data-theme={theme ? "dark" : "light"}
                style={{
                    // backgroundColor: taskStatus.doneIsClicked && "#8ec3bd",
                    color: taskStatus.doneIsClicked && "#fff",
                    border: taskStatus.doneIsClicked ? "none" : "3px solid #8ec3bd"
                }}
                className={taskStatus.doneIsClicked ? "active" : ''}
                onClick={() => {
                    setTaskStatus({
                        allIsClicked: false,
                        doneIsClicked: true,
                        undoneIsClicked: false
                    })
                }}
                id="done_tasks_button"
            >
                Done
            </button>
            <button
                data-theme={theme ? "dark" : "light"}
                style={{
                    // backgroundColor: taskStatus.undoneIsClicked && "#df8083",
                    color: taskStatus.undoneIsClicked && "#fff",
                    border: taskStatus.undoneIsClicked ? "none" : "3px solid #df8083"
                }}
                className={taskStatus.undoneIsClicked ? "active" : ''}
                onClick={() => {
                    setTaskStatus({
                        allIsClicked: false,
                        doneIsClicked: false,
                        undoneIsClicked: true
                    });
                }}
                id="undone_tasks_button"
            >
                Undone
            </button>
        </div>
    )
}

export default TasksStatus