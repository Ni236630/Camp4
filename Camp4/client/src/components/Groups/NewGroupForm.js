import React, {useContext, useEffect, useState, } from 'react'
import { useHistory } from 'react-router-dom';
import { Button,  Input, Card, CardBody, Row, Col } from 'reactstrap';
import { GroupContext } from '../../providers/GroupProvider';
import FilteredMultiSelect from 'react-filtered-multiselect'
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { AttendeeContext } from '../../providers/AttendeeProvider';

const NewGroup = () => {

    const history = useHistory();
    const { addGroup } = useContext(GroupContext);
    const { users, getAll, getUserProfileById } = useContext(UserProfileContext);
    const { attendees, getAllAttendees } = useContext(AttendeeContext);

    const [ GrouptoCreate, setGroupToCreate] = useState({
      
        name: "",
      
    });
    const [groupLeader, setGroupLeader] = useState({});
    const [selectedAttendees, setSelectedAttendees] = useState([])
   
   const handleDeselect = (attendee) => {
    
    let updatedArrayOfMoves = [...selectedAttendees]
        updatedArrayOfMoves = updatedArrayOfMoves.filter(m => m.id !== attendee.id)
        setSelectedAttendees(updatedArrayOfMoves)

      }
    
     const  handleSelectionChange = (selectedAttendees) => {
        setSelectedAttendees(selectedAttendees)
        
        
      }


    useEffect(()=>{
        getAll()
        .then(getAllAttendees)
    },[])


    const handleControlledInputChange = (event) => {
        const newGroup = { ...GrouptoCreate };
        newGroup[event.target.id] = event.target.value;
        setGroupToCreate(newGroup);
      };



    const GroupLeaderInputChange = (event) => {
        if (event.target.value !== 0 )
        {
         
            getUserProfileById(event.target.value)
            .then((res) => {
                  setGroupLeader(res);
                
            })
           
        } 
      
    }

   

    const groupToSend = {
        name : GrouptoCreate.name,
        userProfile: groupLeader, 
        attendees: selectedAttendees
    }

    const saveNewGroup = () => {
      
       
       addGroup(groupToSend)
        .then(()=> {
            history.push("/group")
        })
        
    }
 

    return (
        <> 
    
        <Row>
        {GrouptoCreate.name.replace(/ /g,'').length === 0? 
                    <Button className="ml-4 mt-2" disabled 
                        style={{ cursor: 'pointer' }} 
                        onClick={() =>{
                            saveNewGroup()
                        }}>
                    Save
                    </Button> 
                    : 
                    <Button className="ml-4 mt-2" active 
                        style={{ cursor: 'pointer' }} 
                        onClick={() =>{
                            saveNewGroup()
                        }}>
                    Save
                    </Button> }

                    <Button className="ml-auto mr-4 mt-2"  
                        onClick={()=>{
                            history.push("/group")
                        }}
                        style={{ cursor: 'pointer' }} 
                        > 
                        Cancel </Button>
        </Row> 
        <Row>
            <Col>
        <Card>
        <CardBody>
            <h3>New Group</h3>
           <div >
               <fieldset className="mb-2">
                <Input type="text"
                        name="name"
                        id="name"
                        value={GrouptoCreate.name}
                        placeholder = "Name of New Group"
                        autoComplete="off"
                        onChange = {handleControlledInputChange}
                        />
               </fieldset>
             
           </div>
        </CardBody>
    </Card>
    <Card>
        <CardBody>
            <h3>Group Leader</h3>
           <div >
               <fieldset className="mb-2">
               <select name="groupLeader" onChange={GroupLeaderInputChange}id="groupLeaderSelect">
            <option value="0">Please Select A Leader</option>
            {users.map((u) => {   
                if(u.groupId === 1 ){
                    return <option   key={u.id} value={u.id}>{u.firstName} {u.lastName}</option>;  
                }  
            })}
          </select>
               </fieldset>
           
           </div>
        </CardBody>
    </Card>
    </Col>
    <Col>
    <Card>
        <CardBody>
            <h3>Group Attendees</h3>
            <Row>
           <Col className="container">
           <FilteredMultiSelect
        onChange={handleSelectionChange}
        options={attendees}
        selectedOptions={selectedAttendees}
        textProp="firstName"
        valueProp="id"
       
      />
            </Col>
            <Col>

        {selectedAttendees.length === 0 && <p>(no one selected yet)</p>}
        {selectedAttendees.length > 0 && <ul>
        {selectedAttendees.map((attendee, i) => <li key={attendee.id}>
          {`${attendee.firstName} `}
          <button type="button" onClick={ () => {handleDeselect(attendee)}}>
            &times;
          </button>
        </li>)}
      </ul>}
           
           </Col>
           </Row>
        </CardBody>
    </Card>
    </Col>
    </Row>
    </>
    )



}

export default NewGroup;