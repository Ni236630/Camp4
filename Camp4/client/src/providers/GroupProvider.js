import React, { useState,  createContext, useContext } from "react";
import {UserProfileContext} from './UserProfileProvider'
export const GroupContext = createContext();

export function GroupProvider(props) {
    const apiUrl = "/api/group";

    const {getToken} = useContext(UserProfileContext);
    const [groups, setGroups] = useState([]);
    const [displayGroupId, setDisplayGroupId] = useState(false)
    const [group, setGroup] = useState({
        attendees: []
    });


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

    const getGroupById = (id) => {
        return getToken().then((token) => 
        fetch(`${apiUrl}/${id}`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(setGroup)
    )
    }







    return (
        <GroupContext.Provider value={{getAllGroups, groups, group, displayGroupId, setDisplayGroupId, getGroupById}}>
            {
                props.children
            }
            </GroupContext.Provider>
    )
}
