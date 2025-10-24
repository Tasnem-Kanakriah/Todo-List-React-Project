// import { createContext, createElement, useState } from "react";

// export const TasksStatusContext = createContext()

// export const TasksStatusProvider = ({children}) => {
    // const [taskStatus, setTaskStatus] = useState({
    //     allIsClicked: true,
    //     doneIsClicked: false,
    //     undoneIsClicked: false,
    // });

//     return createElement(
//         TasksStatusContext.Provider,
//         {value: {taskStatus, setTaskStatus}},
//         children
//     )
// }

import { createContext } from "react";

export const TasksStatusContext = createContext({})