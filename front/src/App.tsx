import './App.css'
import {Bar} from "./components/Bar/Bar";
import {useEffect, useState} from "react";
import {dateType, taskType} from "./types/types";
import {TaskDetails} from "./components/TaskDetails/TaskDetails";
import {Month} from "./components/Month/Month";
import {DayView} from "./components/DayView/DayView";
import {WeekView} from "./components/WeekView/WeekView";
import {Reminders} from "./components/Reminders/Reminders";

function App() {


    const [tasks, setTasks] = useState<taskType[]>(null)

    const dateNow = new Date()
    const [date, setDate] = useState<dateType>({year: dateNow.getFullYear(),month: dateNow.getMonth()+1, day: dateNow.getDate()});
    const [style, setStyle] = useState<'m'|'w'|'d'>('m');

    const [modal, setModal] = useState(false);
    const [modalTask, setModalTask] = useState<taskType|null>(null);

    const openModal = (task:taskType|null) => {
        setModalTask(task? task : null)
        setModal(true)
    }

  return (
    <>
        <h1>Calender Scheduler</h1>
        <Bar date={date} style={style} setDate={setDate} setStyle={setStyle} openModal={openModal} setTasks={setTasks}/>
        {style === 'm' ?
            <Month date={date} tasks={tasks} openModal={openModal} setTasks={setTasks}/> :
            style === 'w' ?
                <WeekView date={date} tasks={tasks} openModal={openModal} setTasks={setTasks} setDate={setDate}/> :
                <DayView date={date} tasks={tasks} openModal={openModal} setTasks={setTasks}/>
        }
        <Reminders allTasks={tasks}/>
        {modal ? <TaskDetails task={modalTask} setModal={setModal} setTasks={setTasks}/> : null}
    </>
  )
}

export default App
