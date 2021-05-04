import React, {useContext, useEffect} from 'react';
import {  UserProfileContext   } from "../../providers/UserProfileProvider";


const UserList = () => {

    const {users, getAll} = useContext(UserProfileContext);
    console.log(users);

    useEffect(() => {
        getAll();
    }, []);


    return(
        <div>
            {users.map((u)=> {
               return <p>{u.firstName}</p> 
            })}
        </div>
    )
}

export default UserList;