import {useEffect} from "react";
import {getWeek} from "../../utils/getWeek";
import {Day} from "../Day/Day";
import {AddDays} from "../../utils/addDays";
import {Fetch} from "../../utils/feach";
import {dayFilter} from "../../utils/dayFilter";

export const WeekView = ({date,tasks, openModal, setTasks, setDate}) => {

    useEffect(()=>{
        (async ()=>{
            const res = await Fetch(`/task/week/${date.year}/${date.month}/${date.day+1}`,'GET');
            setTasks(res)
        })()
    },[date])

    const elements = [0,1,2,3,4,5,6].map(e=> (
        <Day
            date={AddDays(date,e)}
            openModal={openModal}
            tasksProp={dayFilter(AddDays(date,e),tasks)}
        />
    ))

    return(
        <div className='table-week'>
        {elements}
        </div>
    )
}