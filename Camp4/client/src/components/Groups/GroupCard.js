import React, { useContext } from 'react';
import { Card, CardBody } from 'reactstrap';
import { GroupContext } from '../../providers/GroupProvider';



export const GroupCard = ({ group }) => {

    const {setDisplayGroupId} = useContext(GroupContext)

    const handleClick =  () => {
        setDisplayGroupId(group.id)
  
        
    }

    return (
        <Card className="m-4">
            <CardBody id={group.id}>
                <h5 className="text-center">{group.name}</h5>
            <a onClick={handleClick}>
                <p className="text-center">to see details</p>
            </a>
            </CardBody>
        </Card>
    );
};