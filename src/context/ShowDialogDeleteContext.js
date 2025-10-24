// import { createContext, createElement, useState } from "react";

// export const ShowDialogContext = createContext();

// export const ShowDialogProvider = ({ children }) => {
    // const [showDialog, setShowDialog] = useState(false);

//     return createElement(
//         ShowDialogContext.Provider,
//         { value: { showDialog, setShowDialog } },
//         children
//     );
// };

import { createContext } from "react";

export const ShowDialogDeleteContext = createContext();