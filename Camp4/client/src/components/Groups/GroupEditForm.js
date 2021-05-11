import React, {useState, useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { GroupContext } from '../../providers/GroupProvider';
import { Card, CardBody, Row, Input, Button,  Col } from 'reactstrap'
import FilteredMultiSelect from 'react-filtered-multiselect'
import { UserProfileContext} from '../../providers/UserProfileProvider';
import { AttendeeContext } from '../../providers/AttendeeProvider';




const GroupEditForm = () => {

    const userProfile = sessionStorage.getItem("userProfile");
    const usableUser = JSON.parse(userProfile)

    const { id } = useParams();
    const { getGroupById, group, editGroup } = useContext(GroupContext);
    const { users,  getUserProfileById, setUser,user } = useContext(UserProfileContext);
    const { attendees, getAllAttendees } = useContext(AttendeeContext);



    const [ selectedAttendees, setSelectedAttendees] = useState([]);
    const [ selectedLeader, setSelectedLeader ] = useState({});
    const [ GrouptoCreate, setGroupToCreate] = useState({
        id: 0,
        name: "",
        userProfile:{},
        attendees: []
        
      
    });
    
    

    const history = useHistory();

    const handleDeselect = (attendee) => {
    
        let updatedArrayOfMoves = [...selectedAttendees]
            updatedArrayOfMoves = updatedArrayOfMoves.filter(m => m.id !== attendee.id)
            setSelectedAttendees(updatedArrayOfMoves)
    
          }
        

         const  handleSelectionChange = (s) => { setSelectedAttendees(s)  }

          
       
    
    useEffect(() => {

        if (id) {
            getAllAttendees()
            getGroupById(id)        
        } else {
            setGroupToCreate({
              
                name: "",
                userProfile: {},
                attendees:[]
                
            });
        }    
    }, [id])

    useEffect(() => {
        getUserProfileById(usableUser.id)
        .then((userprofile)=>{
            setUser(userprofile)
        })
    })

    useEffect(() => {
            if (group.attendees)
            {
                setSelectedAttendees(group.attendees)
                setGroupToCreate((prevState) => {
                    return {...prevState, name: group.name, attendees: selectedAttendees, userProfile: group.userProfile}})
            }
    }, [group])


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
        Id: group.id,
        name: GrouptoCreate.name,
        userProfile: GrouptoCreate.userProfile,
        attendees: selectedAttendees
    }

    const saveGroupEdit = () => {
        user.userRoleId === 1?
     editGroup(groupToSend)
            .then(()=> {
                history.push("/group")
            })
            :  window.alert("you are not an admin")
        
    }
 

    return (
        <> 
     
       
   
        <Row>
        {GrouptoCreate?.name?.replace(/ /g,'').length === 0 ? 
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
            <h3>{`${group.name}`}</h3>
           <div >
               <fieldset className="mb-2">
                <Input type="text"
                        name="name"
                        id="name"
                        value={GrouptoCreate.name}
                        placeholder = {group.name}
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
               <select name="groupLeader" onChange={GroupLeaderInputChange} id="groupLeaderSelect">
           {group.userProfile ?  <option value={group.userProfile.id}>{group.userProfile.firstName} {group.userProfile.lastName}</option>: <option value="0">Please Select A Leader</option>}
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
        onChange={ handleSelectionChange}
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