import React, { useContext} from 'react';
import { useHistory } from 'react-router';
import {Row, Col, Button} from 'reactstrap'
import { AttendeeContext } from '../../providers/AttendeeProvider';
import AttendeeList from '../Attendees/AttendeeList';
import UserList from '../UserProfile/UserList'





const PersonnelOverview = () => {
    const {getAllAttendees} = useContext(AttendeeContext);

    const history = useHistory();
    
    return (
        <>
           <Row>
               <Button className="ml-4 mt-2 mr-auto" onClick={() => {history.push("/newUser")}}> New Employee </Button>
               <Button className="ml-4 mt-2 mr-4" onClick={() => {history.push("/newAttendee")}}> New Attendee </Button>
            </Row>
           <Row className="mt-auto"> 
               <Col>
                    <h1 className="text-center">Employees</h1>
                    <UserList />
               </Col>
               <Col>
                    <h1 className="text-center"> Attendees</h1>
                    <AttendeeList />
               </Col>
           </Row>
        </>
    );
}

export default  PersonnelOverview