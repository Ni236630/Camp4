import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';


export const UserProfileCard = ({ userProfile }) => {
    


    return (
        <Card className="m-4">
                <h3>Name: {userProfile.firstName} {userProfile.lastName}</h3>
            <CardBody>
            <Link className="text-center"to={`/userprofile/${userProfile.id}`}>
               to see details
            </Link>
            </CardBody>
        </Card>
    );
};