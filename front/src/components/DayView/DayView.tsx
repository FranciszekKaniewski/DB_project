import {Day} from "../Day/Day";
import {useEffect} from "react";
import {Fetch} from "../../utils/feach";
import {dayFilter} from "../../utils/dayFilter";

export const DayView = ({date,tasks, openModal, setTasks}) => {

    useEffect(()=>{
        (async ()=>{
            const res = await Fetch(`/task/day/${date.year}/${date.month}/${date.day}`,'GET');
            setTasks(res)
        })()
    },[date])

    return(
        <div className='table-day'>
        <Day
            date={date}
            openModal={openModal}
            tasksProp={dayFilter(date,tasks)}
        />
        </div>
    )
}