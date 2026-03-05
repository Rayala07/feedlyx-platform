import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const ProfileContext = createContext();

export const ProfileContextProvider = ({children}) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([]) 

    return (
        <ProfileContext.Provider value={{loading, setLoading, user, setUser, posts, setPosts}}>
            {children}
        </ProfileContext.Provider>
    )
}