import React, {useContext, useEffect} from 'react';
import {  UserProfileContext   } from "../../providers/UserProfileProvider";
import { UserProfileCard } from './UserProfileCard';


const UserList = () => {

    const {users, getAll} = useContext(UserProfileContext);

    useEffect(() => {
        getAll();
    }, []);


    return(
        <div className="container">
            {users.map((u)=> {
               return <UserProfileCard key={u.id} userProfile={u}/>
            })}
        </div>
    )
}

export default UserList;