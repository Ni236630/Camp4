import React, {useContext, useEffect} from 'react'
import {Row, Card, CardBody, Button} from 'reactstrap'


const AttendeeDetails = () => {
  



    return (
        <>

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
}

export default AttendeeDetails