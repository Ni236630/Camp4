import React, { useEffect, useContext } from 'react';
import { GroupContext } from '../../providers/GroupProvider';
import { Card, CardBody } from 'reactstrap';


export const GroupDetail = ({groupId}) => {
 
    
    
    const {getGroupById, group} = useContext(GroupContext)
    

    useEffect(() => {
        getGroupById(groupId)
       
      
       
    }, []);

 
    
    return (
        <>
        <h1 className="text-center">{group.name}</h1>
        <Card className="container mt-1">
            <CardBody>
       
            {console.log(group)}
          { !group.userProfile ? <p>No leader has been assigned</p> : <p>Group Leader: {group.userProfile.firstName} {group.userProfile.lastName}</p>}
  
            <ul>{group.attendees.length > 0 ?( group.attendees.map((a)=>{
              return <li key={a.Id}>{a.firstName} {a.lastName}</li>
          }) )
          :
          <p>There is no one in this group</p>}</ul>
          </CardBody>
        </Card>
        </>
    )
};