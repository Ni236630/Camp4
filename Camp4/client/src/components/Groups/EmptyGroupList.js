import React,   { useContext, useEffect } from "react";
import { GroupContext } from '../../providers/GroupProvider'
import {GroupCard} from './GroupCard'


const EmptyGroupList = () => {

    const {groups, getAllGroups} = useContext(GroupContext);

    useEffect(()=>{
        getAllGroups()
    },[])

    return(
        <div>
         {
             groups.filter((groupa)=> groupa.id !== 1 && groupa ).map((g)=>{
                 return <GroupCard key={g.id} group={g} />
             })
         }
        </div>

    )


}

export default EmptyGroupList;