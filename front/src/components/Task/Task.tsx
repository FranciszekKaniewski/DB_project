import './task.css'
export const Task = ({task,start,end,color,openModal}) => {

    const style = {backgroundColor: color}

    return(
        <div style={style} className='task'>
            <h3 onClick={()=>openModal(task)}>{task.title.length>18?`${task.title.slice(0,15)}...`:task.title} ({task.type.slice(0,1)}) {task.reminder?'🔔':null}</h3>
            <span>
                {`${new Date(start).getHours()}:${new Date(start).getMinutes() < 10 ? '0'+(new Date(start).getMinutes()) : new Date(start).getMinutes()}`} -
                {` ${new Date(end).getHours()}:${new Date(end).getMinutes() < 10 ? '0'+(new Date(end).getMinutes()) : new Date(end).getMinutes()}`}
            </span>
        </div>
    )
}