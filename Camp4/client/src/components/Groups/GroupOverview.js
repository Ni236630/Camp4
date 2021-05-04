import React, {useState} from 'react';
import {Row, Col, Button} from 'reactstrap'
import GroupList from './GroupList';



const GroupOverview = () => {
    const userProfile = sessionStorage.getItem("userProfile");
    const usableUser = JSON.parse(userProfile)
    const [displayForm, setDisplayForm] = useState(false)


    
    return (
        <>
           <Row><Button className="ml-4 mt-2" onClick={()=>{setDisplayForm(true)}}> New Group </Button></Row>
           <Row className="mt-auto"> 
               <Col>
                    <h1 className="text-center"> Groups</h1>
                    <GroupList />
               </Col>
               <Col>
               {
                   displayForm? <p>I am a form in the future </p>  : <p>click me</p>
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