import React, { useContext, useEffect} from 'react';
import { useHistory } from 'react-router';
import {Row, Col, Button} from 'reactstrap'
import { GroupContext } from '../../providers/GroupProvider';
import UnassignedAttendeeList from '../Attendees/UnassignedAttendees';


import { GroupDetail } from './GroupDetail';
import GroupList from './GroupList';



const GroupOverview = () => {
    const {displayGroupId, groups} = useContext(GroupContext);

    const history = useHistory();

    useEffect(()=> {
  
    },[groups])
    
    return (
        <>
           <Row><Button className="ml-4 mt-2" onClick={() => {history.push("/newGroup")}}> New Group </Button></Row>
           <Row className="mt-auto"> 
               <Col>
                    <h1 className="text-center"> Groups</h1>
                    <GroupList />
               </Col>
               <Col>
               {
                   displayGroupId? <GroupDetail key={displayGroupId} groupId={displayGroupId}/>   
                   :
                    <h1>Select a group for details</h1>
               }
               </Col>
               <Col>
                    <h1 className="text-center">Unassigned Persons</h1>
                    <UnassignedAttendeeList />
               </Col>
           </Row>
        </>
    );
}

export default  GroupOverview