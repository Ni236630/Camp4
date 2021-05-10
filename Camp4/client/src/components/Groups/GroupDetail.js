import React, { useEffect, useContext } from 'react';
import { GroupContext } from '../../providers/GroupProvider';
import { Card, CardBody, Button, Row } from 'reactstrap';
import { useHistory } from 'react-router';


export const GroupDetail = ({groupId}) => {
 
    const history = useHistory();
    
    const {getGroupById, group, deleteGroup, getAllGroups, setDisplayGroupId } = useContext(GroupContext)
    


    useEffect(() => {
        getGroupById(groupId, group)
       
      
       
    }, []);

    const deleteThisGroup = () => {
       deleteGroup(groupId)
       .then(() => {
           getAllGroups()
       })
       .then(()=>{
        setDisplayGroupId(false)
       })
       
    }
    
    return (
        <>
        <h1 className="text-center">{group.name}</h1> 
        <Card className="container mt-1">
            <CardBody>
           <Row> 
           <Button className="ml-1" onClick={() => {deleteThisGroup()}} >Delete</Button>
               <Button className="ml-auto mr-1" onClick={()=>{history.push(`/editGroup/${groupId}`)}} >Edit</Button>
            </Row>
          { !group.userProfile ? <p>No leader has been assigned</p> : <p>Group Leader: {group.userProfile.firstName} {group.userProfile.lastName}</p>}
  
            <ul>{group.attendees.length > 0 ?( group.attendees.map((a)=>{
              return <li key={a.Id}> {a.firstName} {a.lastName}</li>
          }) )
          :
          <p>There is no one in this group</p>}</ul>
          </CardBody>
        </Card>
        </>
    )
};