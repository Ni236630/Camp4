import React from 'react';
import {Row, Col} from 'reactstrap'
import GroupList from './components/Groups/GroupList';

export default function Hello() {
    const userProfile = sessionStorage.getItem("userProfile");
    const usableUser = JSON.parse(userProfile)
    
    return (
        <>
           <Row className="mt-auto"> 
               <Col>
                    <h1 >Welcome, {usableUser.firstName}</h1>

                    {
                        usableUser.groupId = 1? <h3 className="mb-auto">You are not assigned to any groups</h3> 
                        :
                        <p>Get Group By ID and Place here!</p> 

                    }
                    
               </Col>
               <Col>
                <div>
                    <h1 className="text-center">Current Groups</h1>    
                    <GroupList/>
                </div>
               </Col>
           </Row>
        </>
    );
}