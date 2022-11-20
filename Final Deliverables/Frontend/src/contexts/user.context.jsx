import { createContext, useState } from "react";

export const UserContext = createContext({
    currentUser : null,
    setCurrentUser : ()=> null,
    signOutUser:()=>null
});

export const UserProvider = ({children})=>{
    const [currentUser,setCurrentUser] = useState(null);

    const signOutUser = ()=>{
        setCurrentUser(null);
    }

    const value = {currentUser,setCurrentUser,signOutUser};


    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}