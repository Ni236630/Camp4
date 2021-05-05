import React, { useEffect, useContext } from 'react';
import { GroupContext } from '../../providers/GroupProvider';


export const GroupDetail = ({groupId}) => {
 
    
    
    const {getGroupById, group} = useContext(GroupContext)
    

    useEffect(() => {
        getGroupById(groupId)
       
      
       
    }, []);

    
    return (
        <div className="container">
           
            <h1>{group.name}</h1>
            {group.userProfile === null? <p>No leader has been assigned</p> : <p>Group Leader: {group.userProfile.firstName} {group.userProfile.lastName}</p>}
            group.attendees? <ul>{group.attendees.map((a)=>{
             <li>{a.firstName} {a.lastName}</li>
          })} </ul>
          :
          <p>There is no one in this group</p>
        </div>
    )
};