import {useEffect, useState} from "react";
import {Fetch} from "../../utils/feach";

export const Reminders = (allTasks) => {

    const [tasks, setTasks] = useState(null);

    useEffect(()=>{
        (async ()=>{
            const res = await Fetch(`/task/reminder`,'GET');
            setTasks(res)
        })()
    },[allTasks])

    const elements = tasks?.map(e=><div><p style={e.leftToStart > 0 ?{color: 'rgb(110, 110, 170)'}:{color:'rgb(150, 64, 64)'}}>Task {e.title} {e.leftToStart > 0 ? 'is starting in' : 'is ending in'}  {e.leftToStart > 0 ? e.leftToStart : e.leftToEnd} min.</p></div>)

    return(
        <>
        <h2>Reminders</h2>
            {elements}
        </>
    )
}