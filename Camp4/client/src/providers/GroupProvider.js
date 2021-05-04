import React, { useState,  createContext, useContext } from "react";
import {UserProfileContext} from './UserProfileProvider'
export const GroupContext = createContext();

export function GroupProvider(props) {
    const apiUrl = "/api/group";

    const {getToken} = useContext(UserProfileContext);
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
