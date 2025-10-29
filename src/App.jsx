import { useEffect, useState } from 'react'
import './App.css'
import { ShowDialogDeleteContext } from './context/ShowDialogDeleteContext'
import TodoList from './TodoList'

import { SelectedTaskContext } from './context/SelectedTask'
import { ShowDialogEditContext } from './context/ShowDialogEditContext'

import { SnackBarProvider } from './context/SnackBarContext'
import TasksProvider from './context/TasksListContext'
import { TasksStatusContext } from './context/TasksStatusContext'
import { ThemeContext } from './context/ThemeContext'

import { useTranslation } from 'react-i18next'

function App() {

  const { i18n } = useTranslation()

  useEffect(() => {
    localStorage.setItem("language", i18n.language)
    document.documentElement.lang = i18n.language
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr"
  })

  const ThemeApp = JSON.parse(localStorage.getItem("theme"))

  useEffect(() => {
    document.body.className = ThemeApp && "dark-theme-background"
  }, [ThemeApp])

  const [taskStatus, setTaskStatus] = useState({
    allIsClicked: true,
    doneIsClicked: false,
    undoneIsClicked: false,
  })


  const [showDialogDelete, setShowDialogDelete] = useState(false);

  const [showDialogEdit, setShowDialogEdit] = useState(false);

  const [themeContext, setThemeContext] = useState(ThemeApp);

  const [selectedTask, setSelectedTask] = useState({});

  return (
    <>
      <TasksProvider>
        <TasksStatusContext.Provider value={{ taskStatus, setTaskStatus }}>
          <ShowDialogDeleteContext.Provider value={{ showDialogDelete, setShowDialogDelete }}>
            <ShowDialogEditContext.Provider value={{ showDialogEdit, setShowDialogEdit }}>
              <ThemeContext.Provider value={[themeContext, setThemeContext]}>
                <SelectedTaskContext.Provider value={{ selectedTask, setSelectedTask }}>
                  <SnackBarProvider>
                    <TodoList />
                  </SnackBarProvider>
                </SelectedTaskContext.Provider>
              </ThemeContext.Provider>
            </ShowDialogEditContext.Provider>
          </ShowDialogDeleteContext.Provider>
        </TasksStatusContext.Provider>
      </TasksProvider>
    </>
  )
}

export default App
