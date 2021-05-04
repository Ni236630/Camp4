import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';
import { GroupContext } from '../../providers/GroupProvider';



export const GroupCard = ({ group }) => {
    
    const history = useHistory();
    const {setDisplayForm} = useContext(GroupContext)


    return (
        <Card className="m-4">
            <CardBody>
                <h5 className="text-center">{group.name}</h5>
            <Link onClick={()=>{setDisplayForm(true)}}>
                <p className="text-center">to see details</p>
            </Link>
            </CardBody>
        </Card>
    );
};