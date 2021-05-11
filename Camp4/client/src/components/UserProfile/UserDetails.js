import React, {useContext, useEffect, useState} from 'react'
import { useHistory } from 'react-router'
import {Row, Card, CardBody, Button} from 'reactstrap'
import { UserProfileContext } from '../../providers/UserProfileProvider'



const UserDetails = ({userId, setUView}) => {
    const userProfile = sessionStorage.getItem("userProfile");
    const usableUser = JSON.parse(userProfile)

    const history = useHistory();
    const { getUserProfileById, user, setUser } = useContext(UserProfileContext)
    const [ setActiveUser] = useState({})


    useEffect(() => {
        if(userId)
        {
            getUserProfileById(userId)
                .then((up) => {
                    setUser(up)
                })
        }
    }, [userId])

   useEffect(() => {
       getUserProfileById(usableUser.id)
        .then((upp)=> {
            setActiveUser(upp)
        })
   },[])

    return (
        <>
    
        <Card className="container mt-1">
            <CardBody>
          { user.userRoleId === 1 ? <Row> 
            <Button className=" mr-1" onClick={()=>{history.push(`/editUser/${userId}`)}} >Edit</Button>
           <Button className="ml-1 ml-auto" onClick={()=> {
               setUView(false)
           }} >
               Close
            </Button>
            </Row>
            :
            <Row> 
            <Button className=" mr-1" disabled onClick={()=>{history.push(`/editUser/${userId}`)}} >Edit</Button>
           <Button className="ml-1 ml-auto" onClick={()=> {
               setUView(false)
           }} >
               Close
            </Button>
            </Row>
            }
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