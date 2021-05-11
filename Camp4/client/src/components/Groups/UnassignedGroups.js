import React,   { useContext, useEffect } from "react";
import { GroupContext } from "../../providers/GroupProvider";



const UnassignedGroupList = () => {

    const {groups, getAllGroups} = useContext(GroupContext);

    useEffect(()=>{
        getAllGroups()
    },[])

    return(
        <div className="ml-4">
           
         <ul>{
             groups.filter((group) => group.id > 1).map((g)=>{
                 return <li key={g.id}>{g.name} </li>  
             })
         }</ul>
        </div>

    )


}

export default UnassignedGroupList;