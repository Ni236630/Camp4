import React from 'react';
import { Card, CardBody, Button,Row } from 'reactstrap';


export const UserProfileCard = ({ userProfile, thisParams }) => {
    


    return (
        <Card className="m-4">
            <CardBody>
                <Row>

                <Button className="ml-auto mr-1" onClick={()=>{
                    thisParams.setUView(true)
                    thisParams.setAView(false)
                    thisParams.setUId(userProfile.id)}}>
                    Details
                </Button>
                </Row>
                        <h3>Name: {userProfile.firstName} {userProfile.lastName}</h3>
            
            </CardBody>
        </Card>
    );
};