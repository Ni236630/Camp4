import React, { useContext, useEffect } from 'react';
import {Row, Col} from 'reactstrap'
import GroupList from './components/Groups/GroupList';
import { GroupContext } from './providers/GroupProvider';
import { UserProfileContext } from './providers/UserProfileProvider';

export default function Hello() {
    const userProfile = sessionStorage.getItem("userProfile");
    const usableUser = JSON.parse(userProfile)

    const {getGroupById,  group, groups, getAllGroups } = useContext(GroupContext)
    const {getUserProfile, user } = useContext(UserProfileContext)
    
    useEffect(() => {

             if(usableUser)
        {
          
            
            getUserProfile(usableUser.firebaseId)
            .then(()=>{
                    
                getGroupById(user.groupId)
            })
       }},[usableUser.id])
       

        useEffect(() => {
            getAllGroups()
        },[])
       
        
  

    

    return (
        <>
        {}
           <Row className="mt-auto"> 
               <Col>
                    <h1 >Welcome, {usableUser.firstName}</h1>

                    {
                        usableUser.groupId === 1? <h3 className="mb-auto">You are not assigned to any groups</h3> 
                        :
                        <h3> You are assigned to the group: <strong>{group.name}</strong> </h3> 

                    }
                    
               </Col>
               <Col>
                <div>
                    <h1 className="text-center">Current Groups</h1>    
                    <GroupList/>
                    {/* <ul>

                    {groups.map((g) => {
                        <li key={g.id} >{g.name}</li>
                    })}
                    </ul> */}
                </div>
               </Col>
           </Row>
        </>
    );
}