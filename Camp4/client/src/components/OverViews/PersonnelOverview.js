import React, {useState, useContext, useEffect} from 'react';
import { useHistory } from 'react-router';
import {Row, Col, Button} from 'reactstrap'
import { AttendeeContext } from '../../providers/AttendeeProvider';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import AttendeeList from '../Attendees/AttendeeList';
import NewAttendee from '../Attendees/NewAttendee';
import UserDetails from '../UserProfile/UserDetails';
import UserList from '../UserProfile/UserList'





const PersonnelOverview = () => {
   
    const { getAll, users } = useContext(UserProfileContext);
    const {getAllAttendees, attendees} = useContext(AttendeeContext)

    const [viewEmployeeDetails, setViewEmployeeDetails] = useState(false)
    const [viewAttendeeDetails, setViewAttendeeDetails] = useState(false)
    const [viewEmployeeId, setViewEmployeeId] = useState()
    const [viewAttendeeId, setViewAttendeeId] = useState()

    const history = useHistory();
    
    useEffect(() => {
        getAllAttendees()
        getAll()
    }, [])


    return (
        <>
           <Row>
               {/* <Button className="ml-4 mt-2 mr-auto" onClick={() => {history.push("/newUser")}}> New Employee </Button> */}
               <Button className="ml-auto mt-2 mr-4" onClick={() => {
                    setViewAttendeeDetails(true) 
                    setViewEmployeeDetails(false)}}> 
                    New Attendee 
                </Button>
            </Row>
           <Row className="mt-auto"> 
               <Col>
                    <h1 className="text-center">Employees</h1>
                    <UserList setUView={setViewEmployeeDetails} setAView={setViewAttendeeDetails} setUId={setViewEmployeeId} />
               </Col>
               <Col>
                    <h1 className="text-center"> Details </h1>
                    {viewAttendeeDetails? <NewAttendee  setAView={setViewAttendeeDetails}/> : null}
                    {viewEmployeeDetails? <UserDetails userId={viewEmployeeId} setAView={setViewAttendeeDetails}  setUView={setViewEmployeeDetails}/> : null }
               </Col>
               <Col className="overflow-auto">
                    <h1 className="text-center"> Attendees</h1>
                    <AttendeeList setAView={setViewAttendeeDetails} setUView={setViewEmployeeDetails}/>
               </Col>
           </Row>
        </>
    );
}

export default  PersonnelOverview