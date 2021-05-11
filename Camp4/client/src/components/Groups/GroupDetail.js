import React, { useEffect, useContext } from 'react';
import { GroupContext } from '../../providers/GroupProvider';
import { Card, CardBody, Button, Row } from 'reactstrap';
import { useHistory } from 'react-router';
import { UserProfileContext } from '../../providers/UserProfileProvider';


export const GroupDetail = ({groupId}) => {
    const userProfile = sessionStorage.getItem("userProfile");
    const usableUser = JSON.parse(userProfile)

 
    const history = useHistory();
    
    const {getGroupById, group, deleteGroup, getAllGroups, setDisplayGroupId } = useContext(GroupContext)
    const { getUserProfileById, user, setUser} = useContext(UserProfileContext)


    useEffect(() => {
        getGroupById(groupId, group)
       getUserProfileById(usableUser.id)
        .then((userprofile)=>{
            setUser(userprofile)
        })
      
       
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
          
               {
                   user.userRoleId === 1 ?  <Row> <Button className="ml-1" onClick={() => {deleteThisGroup()}} >Delete</Button>
               <Button className="ml-auto mr-1" onClick={()=>{history.push(`/editGroup/${groupId}`)}} >Edit</Button>  </Row>
               :
               <Row>
                   <Button className="ml-1 " disabled  onClick={() => {deleteThisGroup()}} >Delete</Button>
                   <Button className="ml-auto mr-1 " disabled onClick={()=>{history.push(`/editGroup/${groupId}`)}} >Edit</Button> 
               </Row>
               }
           
           
          { !group?.userProfile ? <p> No leader has been assigned</p> : <p>Group Leader: {group.userProfile.firstName} {group.userProfile.lastName}</p>}
  
            <ul>{group?.attendees.length > 0 ?( group.attendees.map((a)=>{
              return <li  key={a.id}> {a.firstName} {a.lastName}</li>
          }) )
          :
          <p>There is no one in this group</p>}</ul>
          </CardBody>
        </Card>
        </>
    )
};