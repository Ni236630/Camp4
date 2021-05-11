
import React, {useState, useContext, useEffect } from 'react'
import {useHistory, useParams} from 'react-router-dom'
import { UserProfileContext } from '../../providers/UserProfileProvider'
import { Card, CardBody, Row, Input, Button,  Col } from 'reactstrap'
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider'


const EditUser = () => {

    const {id} = useParams();
    const {getUserProfileById, user, editUser} = useContext(UserProfileContext);

    const [ newUserFirst, setNewUserFirst ] = useState("")
    const [ newUserLast, setNewUserLast ] = useState("")
    const [ newUserRole, setNewUserRole] = useState(0)
    
    

    const history = useHistory();

    useEffect(()=>{
        if(id)
        {
            getUserProfileById(id)
         
            
        }
        else 
        {
          return  null
        }

    },[id])

    useEffect(() => {
        if (user.firstName)
        {
            setNewUserFirst(user.firstName)
            setNewUserLast(user.lastName)
            setNewUserRole(user.userRoleId)
        }
    },[user])

    const userToSave = {
        id, 
        firstName:newUserFirst,
        lastName:newUserLast,
        userRoleId: parseInt(newUserRole)
        
    }

    const handleFirstNameInputChange = (event) => {
        setNewUserFirst(event.target.value)
    }
    const handleLaststNameInputChange = (event) => {
        setNewUserLast(event.target.value)
    }
    const handleRoleInputChange = (event) =>{
        setNewUserRole(event.target.value)
    }

    const saveUserEdit = () => {
        editUser(userToSave)
        .then(() => {
            history.push('/personnel')
        })
 }
    return (
        <> 
     {console.log(userToSave, id)}
    
        <Row>
        {newUserFirst?.replace(/ /g,'').length === 0? 
                    <Button className="ml-4 mt-2" disabled 
                        style={{ cursor: 'pointer' }} 
                        onClick={() =>{
                            saveUserEdit()
                        }}>
                    Save
                    </Button> 
                    : 
                    <Button className="ml-4 mt-2" active 
                        style={{ cursor: 'pointer' }} 
                        onClick={() =>{
                            saveUserEdit()
                        }}>
                    Save
                    </Button> }

                    <Button className="ml-auto mr-4 mt-2"  
                        onClick={()=>{
                            history.push("/personnel")
                        }}
                        style={{ cursor: 'pointer' }} 
                        > 
                        Cancel </Button>
        </Row> 
        <Row>
            <Col>
        <Card>
        <CardBody>
            <h3>{`${user.firstName} ${user.lastName}`}</h3>
           <div >
               <fieldset className="mb-2">
                First Name: <Input type="text"
                        name="firstName"
                        id="firstName"
                        value={newUserFirst}
                        placeholder = {user.firstName}
                        autoComplete="off"
                        onChange = {handleFirstNameInputChange}
                        />
               </fieldset>
             
           </div> 
           <div >
               <fieldset className="mb-2">
               Last Name: <Input type="text"
                        name="lastName"
                        id="lastName"
                        value={newUserLast}
                        placeholder = {user.lastName}
                        autoComplete="off"
                        onChange = {handleLaststNameInputChange}
                        />
               </fieldset>
           </div> 
             <div >
               <fieldset className="mb-2">
               <select name="role" onChange={handleRoleInputChange} id="roleSelect">
                    <option value="0">Please Select A Role</option>
                    <option value="1">Administrator</option>
                    <option value="2">Employee</option>
            
          </select>
               </fieldset>
           
           </div> 
        </CardBody>
    </Card>
    </Col>
    </Row>
    </>
    )

}

export default EditUser;