import React,   { useContext, useEffect } from "react";
import { AttendeeContext } from '../../providers/AttendeeProvider'


const UnassignedAttendeeList = () => {

    const {attendees, getAllAttendees} = useContext(AttendeeContext);

    useEffect(()=>{
        getAllAttendees()
    },[])

    return(
        <div className="ml-4">
           
         <ul>{
             attendees.filter((attendee) => attendee.groupId === 1).map((a)=>{
                 return <li key={a.id}>{a.firstName} {a.lastName}</li>  
             })
         }</ul>
        </div>

    )


}

export default UnassignedAttendeeList;