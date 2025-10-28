import { createContext, useContext, useState } from "react";
import SnackBar from "../components/SnackBar/SnackBar";

const SnackBarContext = createContext({});

export const SnackBarProvider = ({ children }) => {

    const [openSnackBar, setOpenSnackBar] = useState(false)
    const [messageSnackBar, setMessageSnackBar] = useState("")

    function showHideSnackBar(message) {
        // console.log(message);
        setMessageSnackBar(message);
        setOpenSnackBar(true);
        setTimeout(() => {
            setOpenSnackBar(false);
        }, 3000);
    }

    return (
        <SnackBarContext.Provider value={{ showHideSnackBar }}>
            {children}
            <SnackBar open={openSnackBar} message={messageSnackBar} />
        </SnackBarContext.Provider>
    )
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSnackBar = () => {
    return useContext(SnackBarContext)
}