import { useEffect, useState } from 'react'
import './App.css'
import { ShowDialogDeleteContext } from './context/ShowDialogDeleteContext'
import { TasksListContext } from './context/TasksListContext'
import TodoList from './TodoList'

import { ShowDialogEditContext } from './context/ShowDialogEditContext'
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

  return (
    <>
      <TasksListContext.Provider value={{ tasks, setTasks }}>
        <TasksStatusContext.Provider value={{ taskStatus, setTaskStatus }}>
          <ShowDialogDeleteContext.Provider value={{ showDialogDelete, setShowDialogDelete }}>
            <ShowDialogEditContext.Provider value={{ showDialogEdit, setShowDialogEdit }}>
              <ThemeContext.Provider value={[themeContext, setThemeContext]}>
                <TodoList />
              </ThemeContext.Provider>
            </ShowDialogEditContext.Provider>
          </ShowDialogDeleteContext.Provider>
        </TasksStatusContext.Provider>
      </TasksListContext.Provider>

    </>
  )
}

export default App
