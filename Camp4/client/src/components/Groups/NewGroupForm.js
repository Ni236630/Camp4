import React, {useContext, useEffect, useState, } from 'react'
import { useHistory } from 'react-router';
import { Button,  Input, Card, CardBody, Row, Col } from 'reactstrap';
import { GroupContext } from '../../providers/GroupProvider';
import FilteredMultiSelect from 'react-filtered-multiselect'
import { UserProfileContext } from '../../providers/UserProfileProvider';

const NewGroup = () => {

    const history = useHistory();
    const { addGroup, } = useContext(GroupContext);
    const { users, getAll } = useContext(UserProfileContext);

    const [ GrouptoCreate, setGroupToCreate] = useState({
      
        name: ""
    });
    const [groupLeader, setGroupLeader] = useState({});
   

    useEffect(()=>{
        getAll()
    },[])

    const handleControlledInputChange = (event) => {
        const newGroup = { ...GrouptoCreate };
        newGroup[event.target.id] = event.target.value;
        setGroupToCreate(newGroup);
      };

// figure out how to get the object here!

    const GroupLeaderInputChange = (event) => {
        
        setGroupLeader(event.target.value);
    }

      

    const reset = () => {
       
        setGroupToCreate({
            name:""
        })
    }

    return (
        <>
        <Row>
        {GrouptoCreate.name.replace(/ /g,'').length === 0? 
                    <Button className="ml-4 mt-2" disabled 
                        style={{ cursor: 'pointer' }} 
                        onClick={() =>{
                            addGroup(GrouptoCreate)
                            .then(reset)
                            .then(history.push("/group"))
                        }}>
                    Save
                    </Button> 
                    : 
                    <Button className="ml-4 mt-2" active 
                        style={{ cursor: 'pointer' }} 
                        onClick={() =>{
                            addGroup(GrouptoCreate)
                            .then(reset)
                            .then(history.push("/group"))
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
    </Col>
    <Col>
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
    </Row>
    </>
    )



}

export default NewGroup;