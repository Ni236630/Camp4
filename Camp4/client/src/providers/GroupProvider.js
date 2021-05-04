import React, { useState,  createContext } from "react";

export const GroupContext = createContext();

export function GroupProvider(props) {
    const apiUrl = "/api/userprofile";

    const [groups, setGroups] = useState([]);



    const getAllGroups = () => {
        return getToken().then((token) => 
            fetch(`${apiUrl}`,{
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(setGroups)
        )
    }







    return (
        <GroupContext.Provider value={{getAllGroups, groups}}>
            {
                props.children
            }
            </GroupContext.Provider>
    )
}
