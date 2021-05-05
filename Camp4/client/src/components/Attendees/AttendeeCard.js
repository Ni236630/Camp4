import {React} from 'react';
import { Card, CardBody } from 'reactstrap';



 const AttendeeCard = ({ attendee }) => {
    


    return (
        <Card className="m-4">
            <CardBody>
                <h5 className="text-center">{attendee.firstName}</h5>
            </CardBody>
        </Card>
    );
};

export default AttendeeCard;