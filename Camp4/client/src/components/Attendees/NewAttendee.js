import React, {useContext, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {Row, Card, CardBody, Col, Button, Input} from 'reactstrap'
import {AttendeeContext} from '../../providers/AttendeeProvider'


const NewAttendee = ({setAView}) => {

    const {addAttendee, getAllAttendees} = useContext(AttendeeContext);

    const [ newAttendeeFirst, setNewAttendeeFirst ] = useState("")
    const [ newAttendeeLast, setNewAttendeeLast ] = useState("")

    const history = useHistory();

    const newAttendee = {
        firstName: newAttendeeFirst,
        lastName: newAttendeeLast
    }

    const saveNewAttendee = () => {
        addAttendee(newAttendee)
        .then(() =>{
            getAllAttendees()
            setAView(false)
        })
    }

    const handleFirstNameInputChange = (event) => {
        setNewAttendeeFirst(event.target.value) 
    }
    const handleLaststNameInputChange = (event) => {
        setNewAttendeeLast(event.target.value) 
    }

    return (
        <> 
    
     
      
        <Card>
        <CardBody>
        <Row>
        {newAttendee.firstName.replace(/ /g,'').length === 0? 
                    <Button className="ml-4 mt-2" disabled 
                        style={{ cursor: 'pointer' }} 
                        onClick={() =>{
                            saveNewAttendee()
                        }}>
                    Save
                    </Button> 
                    : 
                    <Button className="ml-4 mt-2" active 
                        style={{ cursor: 'pointer' }} 
                        onClick={() =>{
                            saveNewAttendee()
                        }}>
                    Save
                    </Button> }

                    <Button className="ml-auto mr-4 mt-2"  
                        onClick={()=>{
                            setAView(false)
                        }}
                        style={{ cursor: 'pointer' }} 
                        > 
                        Cancel </Button> 
        </Row> 
            <h3>New Attendee</h3>
           <div >
               <fieldset className="mb-2">
                <Input type="text"
                        name="name"
                        id="firstName"
                        value={newAttendeeFirst}
                        placeholder = "First Name"
                        autoComplete="off"
                        onChange = {handleFirstNameInputChange}
                        />
               </fieldset>
             
           </div>
            
           <div >
               <fieldset className="mb-2">
                <Input type="text"
                        name="name"
                        id="lastName"
                        value={newAttendeeLast}
                        placeholder = "Last Name"
                        autoComplete="off"
                        onChange = {handleLaststNameInputChange}
                        />
               </fieldset>
             
           </div>
        </CardBody>
    </Card>
   
   
    </>
    )
}

export default NewAttendee
