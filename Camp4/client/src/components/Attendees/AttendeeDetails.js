import React, {useContext, useEffect} from 'react'
import {Row, Card, CardBody, Button} from 'reactstrap'
import { UserProfileContext } from '../../providers/UserProfileProvider';

const AttendeeDetails = () => {
  
  const userProfile = sessionStorage.getItem("userProfile");
  const usableUser = JSON.parse(userProfile)


  const { getUserProfileById, user, setUser} = useContext(UserProfileContext)

  useEffect(()=> {
    getUserProfileById(usableUser.id)
    .then((userprofile)=>{
        setUser(userprofile) 
})},[])



    return (
        <>

        <Card className="container mt-1">
            <CardBody>
              { user.userRoleId === 1 ?
           <Row> 
           <Button className="ml-1" onClick={() => {deleteThisGroup()}} >Delete</Button>
               <Button className="ml-auto mr-1" onClick={()=>{history.push(`/editGroup/${groupId}`)}} >Edit</Button>
            </Row>
            :
            <Row> 
           <Button className="ml-1" disabled onClick={() => {deleteThisGroup()}} >Delete</Button>
               <Button className="ml-auto mr-1" disabled onClick={()=>{history.push(`/editGroup/${groupId}`)}} >Edit</Button>
            </Row>

              }
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
}

export default AttendeeDetails