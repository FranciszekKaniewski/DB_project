import {Day} from "../Day/Day";
import {useEffect} from "react";
import {Fetch} from "../../utils/feach";
import {dayFilter} from "../../utils/dayFilter";

export const Month = ({date,tasks, openModal, setTasks}) => {

    useEffect(()=>{
        (async ()=>{
            const res = await Fetch(`/task/month/${date.year}/${date.month}`,'GET');
            setTasks(res)
        })()
    },[date])

    const numOfDays = [1,3,5,7,8,10,12].includes(date.month) ? 31 : date.month != 2 ? 30 : date.year%4 == 0 ? 29 : 28
    const days = Array.from({length: numOfDays }).map((e,i)=>({day: i+1,month: date.month,year: date.year}))

    if(!tasks) return <h1>Lodaing...</h1>

    const daysElements =
        days.map(e =>
            <Day
                dateStyle={'m'}
                openModal={openModal}
                key={e.day}
                date={e}
                tasksProp={dayFilter(e,tasks)}
            />
        )

        return(
            <div className="table">
                {daysElements}
            </div>
        )
}