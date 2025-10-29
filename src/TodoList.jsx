import { useContext, useEffect, useMemo } from "react";
import TaskComponent from "../src/components/TaskComponent/TaskComponent";
import "./TodoList.css";
import AddTaskComponent from "./components/AddTaskComponent/AddTaskComponent";
import DialogDeletePopup from "./components/DialogDeletePopup/DialogDeletePopup";
import DialogEditPopup from "./components/DialogEditPopup/DialogEditPopup";
import { ArabicIcon, EnglishIcon, ThemeIcon, TodoIcon } from "./components/Icons/icons";
import TasksStatus from "./components/TasksStatus/TasksStatus";
import { SelectedTaskContext } from "./context/SelectedTask";
import { ShowDialogDeleteContext } from "./context/ShowDialogDeleteContext";
import { useSnackBar } from "./context/SnackBarContext";
import { useDispatch, useTasks } from "./context/TasksListContext";
import { TasksStatusContext } from "./context/TasksStatusContext";

import { useTranslation } from "react-i18next";

const TodoList = () => {
    const { taskStatus } = useContext(TasksStatusContext)
    const { showHideSnackBar } = useSnackBar()
    const { selectedTask, setSelectedTask } = useContext(SelectedTaskContext)
    const { setShowDialogDelete } = useContext(ShowDialogDeleteContext)

    const { t, i18n } = useTranslation()
    // console.log(i18n.language);


    const tasks = useTasks()
    const dispatch = useDispatch()

    // console.log(tasks);

    useEffect(() => {
        const storageTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        dispatch({ type: 'get-all-tasks', payload: storageTasks });
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);


    let completed = useMemo(() => {
        return tasks.filter(task => task.isDone)
    }, [tasks])

    let notCompleted = useMemo(() => {
        return tasks.filter(task => !task.isDone)
    }, [tasks])

    let tasksList = tasks;

    if (taskStatus.doneIsClicked) {
        tasksList = completed
    }
    if (taskStatus.undoneIsClicked) {
        tasksList = notCompleted
    }

    function deleteTask() {
        dispatch({
            type: 'deleted',
            payload: {
                id: selectedTask.id
            }
        })

        setShowDialogDelete(false)
        setSelectedTask(null)
    }

    const TasksListComponent = (tasksList || []).map(task => (
        <TaskComponent key={task.id} task={task} dispatch={dispatch} />
    ))

    return (
        <>
            <div id="theme_and_lang" >
                <ThemeIcon />
                {i18n.language == "ar" ? <EnglishIcon /> : <ArabicIcon />}
            </div>
            <h1>
                {t("to_do_list")} <TodoIcon />
            </h1>
            <AddTaskComponent dispatch={dispatch} />
            <TasksStatus />
            <div id="tasks_container" style={{
                border: (tasksList.length === 0) ? "none" : "3px solid #dfb046"
            }}>
                {TasksListComponent}
            </div>
            <DialogDeletePopup
                onClickFunc={() => {
                    deleteTask()
                    showHideSnackBar(t('task_deleted'))
                }}
                currentTask={selectedTask}
            />
            <DialogEditPopup
                currentTask={selectedTask}
                dispatch={dispatch}
            />
        </>
    );
};

export default TodoList;
