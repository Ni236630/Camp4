import { Button } from 'reactstrap';
import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { GroupContext } from '../../providers/GroupProvider';
import { AttendeeCard } from '../Attendees/AttendeeCard';

export const GroupDetail = (params) => {
    const { id } = useParams();
    
    const {getAttendeesByGroup, groupAttendees} = useContext(GroupContext);
    

    useEffect(() => {
        getAttendeesByGroup(id)
    }, []);

    
    return (
        <div className="container">
          {groupAttendees.map((a)=>{
              <AttendeeCard key={a.id} attendee={a}/>
          })}
        </div>
    )
};