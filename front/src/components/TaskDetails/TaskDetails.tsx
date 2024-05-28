import {taskType} from "../../types/types";
import './task-details.css'
import {useState} from "react";
import {v4 as uuid} from 'uuid'
import {Fetch} from "../../utils/feach";

export const TaskDetails = ({task,setModal,setTasks}) => {

    const [title, setTitle] = useState<string|null>(task?.title);
    const [startDate, setSDate] = useState<string|null>(task?.startDate);
    const [endDate, setEDate] = useState<string|null>(task?.endDate);
    const [reminder, setReminder] = useState<boolean|null>(task?.reminder);
    const [type, setType] = useState<'soft'|'hard'|null>(task? task.type:'soft');
    const [done, setDone] = useState<boolean|null>(task?.done);

    const [message, setMessage] = useState<string>('');


    const AddOne = async (task:taskType) => {
        console.log(task)
        const res = await Fetch('/task','POST',task);
        console.log(res)
        if(!res.isSuccess) return res.message
        setTasks(prevState => [...prevState,task])
        setModal(false)
    }
    const RemoveOne = async (id:string) => {
        const res = await Fetch(`/task/${id}`,'DELETE');
        console.log(res)
        setTasks(prevState => prevState.filter(e => e.id !== id))
        setModal(false)
    }
    const EditOne = async (task:taskType) => {
        const res = await Fetch(`/task/${task.id}`,'PATCH',task);
        console.log(res)
        if(!res.isSuccess) return res.message
        setTasks(prevState => prevState.filter(e => e.id !== task.id))
        setTasks(prevState => [...prevState,task])
        setModal(false)
    }
    const DoneOne = async (id:string) => {
        setDone(prevState => !prevState)
        const res = await Fetch(`/task/${task.id}`,'PATCH',{...task,done: !done});
        console.log(res)
        if(!res.isSuccess){
            return res.message
        }
        setTasks(prevState => prevState.filter(e => e.id !== task.id))
        setTasks(prevState => [...prevState, {...task,done:!task?.done}])
        setModal(false)
    }

    const formSubmitHandler = async (e) => {
        e.preventDefault()
        const newTask:taskType =
            {id: task ? task.id : uuid(),
                title: title as string,
                startDate: new Date(startDate as string).toISOString(),
                endDate: new Date(endDate as string).toISOString(),
                type: type as 'soft'|'hard',
                done: done?done:false,
                reminder:!!reminder
            }

        if(task){
            setMessage(await EditOne(newTask)??'')
        }else{
            setMessage(await AddOne(newTask)??'')
        }
    }

    return(
        <div className="task-details">
            <h2>{title?.length > 18?`${title?.slice(0,15)}...` : task?.title}</h2>
            <i onClick={()=>setModal(false)}>X</i>
        <form onSubmit={(e)=>formSubmitHandler(e)}>
            <p>Title:</p>
            <input
                type="text"
                required value={title?title:''}
                onChange={e=>setTitle(e.target.value)}
            />

            <p>Start:</p>
            <input
                required
                type="datetime-local"
                value={startDate ?
                    new Date(new Date(startDate).setHours(new Date(startDate).getHours() - new Date().getTimezoneOffset()/60) ).toISOString().slice(0,16) :
                    ''}
                onChange={(e)=>setSDate(e.target.value)}
            />

            <p>End:</p>
            <input
                required
                type="datetime-local"
                value={endDate ?
                    new Date(new Date(endDate).setHours(new Date(endDate).getHours() - new Date().getTimezoneOffset()/60) ).toISOString().slice(0,16) :
                    ''}
                onChange={(e)=>setEDate(e.target.value)}
            />

            <br/><br/>

            <select value={type as 'soft'|'hard'} onChange={(e)=>setType(e.target.value as 'soft'|'hard')}>
                <option value="soft">soft</option>
                <option value="hard">hard</option>
            </select>

            <p>Remind me: <input type="checkbox" checked={reminder??false} onChange={e=>setReminder(e.target.checked)}/></p>

            <button>Save</button>
        </form>
            <br/>
            {task ? <div className="btns">
                <button onClick={() => DoneOne(task.id)}>{!task?.done ? 'Done!' : 'Undone'}</button>
                <button onClick={() => RemoveOne(task.id)}>Delete</button>
            </div> : null}
            {message? <p style={{color:'red'}}>{message}</p>:null}
        </div>
    )
}