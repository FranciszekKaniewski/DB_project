import './day.css'
import {useEffect, useState} from "react";
import {taskType} from "../../types/types";
import {Task} from "../Task/Task";
import {sort} from "../../utils/sort";
export const Day = ({date,tasksProp,openModal,dateStyle}) => {

    const [tasks, setTasks] = useState<taskType[]>(tasksProp);

    const today = (new Date().getDate() == date.day && new Date().getMonth()+1 == date.month && new Date().getFullYear() == date.year)
    const style = today ? {boxShadow: "0 0 1px red", color:'#964040'} : {}

    useEffect(() => {
        setTasks(tasksProp)
    }, [tasksProp]);

    const taskElements = tasks.sort(sort).map(e=>{
        const sDate = new Date(e.startDate)
        const eDate = new Date(e.endDate)

        const start = sDate.getDate() === date.day ? e.startDate : '2024-05-23T00:00:00'
        const end = eDate.getDate() === date.day ? e.endDate : '2024-05-23T24:00:00'

        return (<Task
            key={e.id}
            openModal={openModal}
            task={e}
            start={start}
            end={end}
            color={
                Date.now() > Date.parse(e.endDate) ?
                    e.done ? `rgba(60, 70, 60, ${e.type=="soft"?0.3:1})` : `rgba(70,60,60,${e.type=="soft"?0.3:1})` :
                Date.now() > Date.parse(e.startDate) ?
                    e.done ? `rgba(40,110,40,${e.type=="soft"?0.3:1})` : `rgba(110,40,40,${e.type=="soft"?0.3:1})` :
                    e.done ? `rgba(110,170,120,${e.type == "soft" ? 0.3 : 1})` : `rgba(110,110,170,${e.type == "soft" ? 0.3 : 1})`
            }
        />)})


    return(
        <div className='day' style={ style}>
            <p>{date.day}</p>
            {dateStyle ==='m'? taskElements.slice(0,4):taskElements}
            {tasks.length > 4 && dateStyle ==='m'? `+${tasks.length-4}` :null}
        </div>
    )
}