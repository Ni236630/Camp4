import React, {useContext, useEffect} from 'react';
import {  UserProfileContext   } from "../../providers/UserProfileProvider";


const UserList = () => {

    const {users, getAll} = useContext(UserProfileContext);


    useEffect(() => {
        getAll();
    }, []);


    return(
        <div>
            {users.map((u)=> {
                <p>u.Name</p>
            })}
        </div>
    )
}

export default UserList;