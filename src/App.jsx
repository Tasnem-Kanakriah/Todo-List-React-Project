import { useEffect, useState } from 'react'
import './App.css'
import { ShowDialogDeleteContext } from './context/ShowDialogDeleteContext'
import { TasksListContext } from './context/TasksListContext'
import TodoList from './TodoList'

import { SelectedTaskContext } from './context/SelectedTask'
import { ShowDialogEditContext } from './context/ShowDialogEditContext'


import { SnackBarProvider } from './context/SnackBarContext'
import { TasksStatusContext } from './context/TasksStatusContext'
import { ThemeContext } from './context/ThemeContext'

function App() {

  // localStorage.removeItem("tasks")

  // const TasksList = [
  //   { id: uuid4(), taskTitle: "Figma: Final Project", isDone: false },
  //   { id: uuid4(), taskTitle: "Learn React", isDone: false },
  //   { id: uuid4(), taskTitle: "Todo List React Project", isDone: true },
  //   { id: uuid4(), taskTitle: "Learn FastAPI", isDone: false },
  //   { id: uuid4(), taskTitle: "Learn Tailwind", isDone: true },
  //   { id: uuid4(), taskTitle: "React: Final Project", isDone: false },
  //   { id: uuid4(), taskTitle: "Learn Material UI", isDone: false },
  // ];

  const TasksList = JSON.parse(localStorage.getItem("tasks")) || []
  const ThemeApp = JSON.parse(localStorage.getItem("theme"))
  // console.log(ThemeApp ? "dark" : 'light');


  useEffect(() => {
    document.body.className = ThemeApp && "dark-theme-background"
  }, [ThemeApp])

  const [taskStatus, setTaskStatus] = useState({
    allIsClicked: true,
    doneIsClicked: false,
    undoneIsClicked: false,
  })

  const [tasks, setTasks] = useState(TasksList)

  const [showDialogDelete, setShowDialogDelete] = useState(false);

  const [showDialogEdit, setShowDialogEdit] = useState(false);

  const [themeContext, setThemeContext] = useState(ThemeApp);

  const [selectedTask, setSelectedTask] = useState({});

  // const [openSnackBar, setOpenSnackBar] = useState(false)
  // const [messageSnackBar, setMessageSnackBar] = useState("")

  // function showHideSnackBar(message) {
  //   // console.log(message);
  //   setMessageSnackBar(message)
  //   setOpenSnackBar(true)
  //   setTimeout(() => {
  //     setOpenSnackBar(false)
  //   }, 3000)
  // }

  return (
    <>
      <TasksListContext.Provider value={{ tasks, setTasks }}>
        <TasksStatusContext.Provider value={{ taskStatus, setTaskStatus }}>
          <ShowDialogDeleteContext.Provider value={{ showDialogDelete, setShowDialogDelete }}>
            <ShowDialogEditContext.Provider value={{ showDialogEdit, setShowDialogEdit }}>
              <ThemeContext.Provider value={[themeContext, setThemeContext]}>
                <SelectedTaskContext.Provider value={{ selectedTask, setSelectedTask }}>
                  {/* <SnackBarContext.Provider value={{ showHideSnackBar }}> */}
                  <SnackBarProvider>
                    <TodoList />
                  </SnackBarProvider>
                  {/* </SnackBarContext.Provider> */}
                </SelectedTaskContext.Provider>
              </ThemeContext.Provider>
            </ShowDialogEditContext.Provider>
          </ShowDialogDeleteContext.Provider>
        </TasksStatusContext.Provider>
      </TasksListContext.Provider>

    </>
  )
}

export default App
