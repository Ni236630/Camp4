import React,   { useContext, useEffect } from "react";
import { AttendeeContext } from '../../providers/AttendeeProvider'
import AttendeeCard from './AttendeeCard'

const AttendeeList = () => {

    const {attendees, getAllAttendees} = useContext(AttendeeContext);

    useEffect(()=>{
        getAllAttendees()
    },[])

    return(
        <div >
         {
             attendees.map((a)=>{
                 return <AttendeeCard key={a.id} attendee={a} />
             })
         }
        </div>

    )


}

export default AttendeeList;