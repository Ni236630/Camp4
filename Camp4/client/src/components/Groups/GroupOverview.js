import React, {useState, useContext} from 'react';
import {Row, Col, Button} from 'reactstrap'
import { GroupContext } from '../../providers/GroupProvider';
import { GroupDetail } from './GroupDetail';
import GroupList from './GroupList';



const GroupOverview = () => {
    const {displayForm} = useContext(GroupContext);


    
    return (
        <>
           <Row><Button className="ml-4 mt-2" > New Group </Button></Row>
           <Row className="mt-auto"> 
               <Col>
                    <h1 className="text-center"> Groups</h1>
                    <GroupList />
               </Col>
               <Col>
               {
                   displayForm? <p><GroupDetail /></p>  : <p>click me</p>
               }
               </Col>
               <Col>
               <h1 className="text-center"> Empty Groups</h1>

               </Col>
           </Row>
        </>
    );
}

export default  GroupOverview