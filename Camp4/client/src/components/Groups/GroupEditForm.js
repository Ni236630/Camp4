import React, {useState, useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { GroupContext } from '../../providers/GroupProvider';
import { Card, CardBody, Row, Input, Button,  Col } from 'reactstrap'
import FilteredMultiSelect from 'react-filtered-multiselect'
import { UserProfileContext, UserProfileProvider } from '../../providers/UserProfileProvider';
import { AttendeeContext } from '../../providers/AttendeeProvider';




const GroupEditForm = () => {

    const { id } = useParams();
    const { getGroupById, group, editGroup } = useContext(GroupContext);
    const { users, getAll, getUserProfileById } = useContext(UserProfileContext);
    const { attendees, getAllAttendees } = useContext(AttendeeContext);



    const [ selectedAttendees, setSelectedAttendees] = useState([]);
    const [ selectedLeader, setSelectedLeader ] = useState({});
    const [ GrouptoCreate, setGroupToCreate] = useState({
      
        name: "",
      
    });
    

    const history = useHistory();

    const handleDeselect = (attendee) => {
    
        let updatedArrayOfMoves = [...selectedAttendees]
            updatedArrayOfMoves = updatedArrayOfMoves.filter(m => m.id !== attendee.id)
            setSelectedAttendees(updatedArrayOfMoves)
    
          }
        
         const  handleSelectionChange = (selectedAttendees) => {
            setSelectedAttendees(selectedAttendees)
            
            
          }

          
    
    useEffect(() => {
        getGroupById(id)
            // .then(() => {
            //     setSelectedAttendees(group.attendees)
            // })
            //     .then(() => {
            //         setSelectedLeader(group.UserProfile)
            //     })
    }, [])



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
                setSelectedLeader(res);
                
            })
           
        } 
      
    }

   

    const groupToSend = {
        name : GrouptoCreate.name,
        userProfile: selectedLeader, 
        attendees: selectedAttendees
    }

    const saveGroupEdit = () => {
      
       
        editGroup(groupToSend)
        .then(()=> {
            history.push("/group")
        })
        
    }
 

    return (
        <> 
        {console.log(id)}
    
        <Row>
        {GrouptoCreate.name.replace(/ /g,'').length === 0? 
                    <Button className="ml-4 mt-2" disabled 
                        style={{ cursor: 'pointer' }} 
                        onClick={() =>{
                            saveGroupEdit()
                        }}>
                    Save
                    </Button> 
                    : 
                    <Button className="ml-4 mt-2" active 
                        style={{ cursor: 'pointer' }} 
                        onClick={() =>{
                            saveGroupEdit()
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
            <h3>{`${group.Name}`}</h3>
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
export default GroupEditForm