// import { createContext, createElement, useState } from "react";
// import { v4 as uuid4 } from 'uuid';

// export const TasksListContext = createContext();

// export const TasksListProvider = ({ children }) => {
    // const [tasks, setTasks] = useState([
    //     { id: uuid4(), taskTitle: "Figma: Final Project", isDone: false },
    //     { id: uuid4(), taskTitle: "Learn React", isDone: false },
    //     { id: uuid4(), taskTitle: "Learn FastAPI", isDone: false },
    //     { id: uuid4(), taskTitle: "Todo List React Project", isDone: false },
    //     { id: uuid4(), taskTitle: "Learn Tailwind", isDone: true },
    //     { id: uuid4(), taskTitle: "React: Final Project", isDone: false },
    //     { id: uuid4(), taskTitle: "Learn Material UI", isDone: false },
    // ]);

//     return createElement(
//         TasksListContext.Provider,
//         { value: { tasks, setTasks } },
//         children
//     );
// };


import { createContext } from "react";

export const TasksListContext = createContext([]);