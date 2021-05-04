import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';



export const GroupCard = ({ group }) => {
 
    const history = useHistory();



    return (
        <Card className="m-4">
            <CardBody>
                <h5 className="text-center">{group.name}</h5>
            <Link to={`/groups/${group.id}`}>
                <p className="text-center">to see details</p>
            </Link>
            </CardBody>
        </Card>
    );
};