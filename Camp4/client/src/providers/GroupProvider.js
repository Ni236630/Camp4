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

    const addGroup = (group) => {
        return getToken().then((token) => 
        fetch(`${apiUrl}`,{
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(group)
        })).then(res => res.json())
    }


    const editGroup = (group) => {
        return getToken().then((token)=> 
        fetch(`${apiUrl}/editGroup/${group.id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(group),
        }))
    }




    return (
        <GroupContext.Provider value={{editGroup, getAllGroups, groups, group, displayGroupId, setDisplayGroupId, getGroupById, addGroup}}>
            {
                props.children
            }
            </GroupContext.Provider>
    )
}
