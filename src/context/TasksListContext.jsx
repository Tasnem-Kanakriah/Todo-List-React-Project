import { createContext, useContext, useReducer } from "react";
import taskReducer from "../reducers/tasksReducer";

const TasksContext = createContext([])
const DispatchContext = createContext(null)

const initializer = () => {
    const storageTasks = localStorage.getItem("tasks");
    return storageTasks ? JSON.parse(storageTasks) : [];
};

const TasksProvider = ({children}) => {
    
    const [tasks, dispatch] = useReducer(taskReducer, [], initializer)

    return (
        <TasksContext.Provider value={tasks}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </TasksContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTasks = () => {
    return useContext(TasksContext)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDispatch = () => {
    return useContext(DispatchContext)
}

export default TasksProvider