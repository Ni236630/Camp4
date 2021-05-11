import React, {useContext, useEffect} from 'react'
import { useHistory } from 'react-router'
import {Row, Card, CardBody, Button} from 'reactstrap'
import { UserProfileContext } from '../../providers/UserProfileProvider'



const UserDetails = ({userId, setUView}) => {
    const history = useHistory();
    const { getUserProfileById, user } = useContext(UserProfileContext)

    useEffect(() => {
        if(userId)
        {
            getUserProfileById(userId)
        }
    }, [userId])

    return (
        <>
    
        <Card className="container mt-1">
            <CardBody>
           <Row> 
            <Button className=" mr-1" onClick={()=>{history.push(`/editUser/${userId}`)}} >Edit</Button>
           <Button className="ml-1 ml-auto" onClick={()=> {
               setUView(false)
           }} >
               Close
            </Button>

            </Row>
            <p>First Name:<strong>{user.firstName}</strong>  </p>
            <p>Last Name: <strong>{user.lastName}</strong> </p>
            <p>Email: {user.email}</p>
            {/* <p>Group: {user.group.name}</p> */}


          </CardBody>
        </Card>

        </>
    )
}

export default UserDetails