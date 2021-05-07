import React, {useState, useContext, createContext} from 'react';
import {UserProfileContext} from '../providers/UserProfileProvider'

export const AttendeeContext = createContext();

export function AttendeeProvider(props) {
    const apiUrl = "/api/attendee";
    const {getToken} = useContext(UserProfileContext);
    const [attendees, setAttendees] =useState([]);
    const [groupAttendees, setGroupAttenddees] = useState([]);
    
    const getAllAttendees = () => {
        return getToken().then((token) => 
        fetch(`${apiUrl}`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(setAttendees)
    )
    }

    const getAttendeesByGroup = (groupId) => {
        
        return getToken().then((token) =>
        fetch(`${apiUrl}/group/${groupId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(resp => resp.json())
        .then(setGroupAttenddees)
        );
    }

    const updateAttendeeGroup = (attendees) => {
        return getToken().then((token) =>
        fetch(`/api/attendee/`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(attendees),
        }));
    }



    return (
        <AttendeeContext.Provider value={{updateAttendeeGroup, getAllAttendees, getAttendeesByGroup, attendees, groupAttendees}}>
            {
                props.children
            }
        </AttendeeContext.Provider>
    )
}
