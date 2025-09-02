import React, { createContext, useContext, useState } from "react";

const AppLocalContext = createContext();

export const AppLocalContextProvider = ({ children }) => {
    const [userName, setUserName] = useState("");

    return (
        <AppLocalContext.Provider value={{ userName, setUserName }}>
            {children}
        </AppLocalContext.Provider>
    )
}

export const useUsername = () => useContext(AppLocalContext);