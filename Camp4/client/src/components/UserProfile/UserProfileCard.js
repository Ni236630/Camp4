import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';


export const UserProfileCard = ({ userProfile }) => {
    
    const history = useHistory();



    return (
        <Card className="m-4">
            <Link to={`/userprofile/${userProfile.id}`}>
                <h3 className="text-center">to see details</h3>
            </Link>
            <CardBody>
                <p>First Name: {userProfile.firstName}</p>
            </CardBody>
        </Card>
    );
};