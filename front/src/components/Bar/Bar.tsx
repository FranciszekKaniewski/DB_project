import './bar.css'
import {AddDays} from "../../utils/addDays";

export const Bar = ({date,style,setDate,setStyle,openModal}) => {

    const Arrow = (dir:'l'|'r') => {
        const d = dir === 'l' ? -1 : 1;
        if(style === 'm'){
            setDate(prevState => {
                return (prevState.month == 12 && d>0) || (prevState.month == 1 && d<0) ?
                    {...prevState,month:prevState.month==1?12:1,year:prevState.year+1*d} :
                    {...prevState,month:prevState.month+1*d}
            })
        }else if(style == 'd'){
            setDate(AddDays(date,1*d))
        }else{
            setDate(AddDays(date,7*d))
        }
    }

    return(
        <div className="bar">
            <div className='add'>
                <p onClick={()=>openModal(null)}>ADD</p>
            </div>
            <div className="title">
                <p>{date.year + "/" + date.month} </p>
                <p>{style === 'd'?date.day:null} </p>
                <div className="arrows">
                    <p onClick={()=>Arrow('l')}>◀</p>
                    <p onClick={()=>Arrow('r')}>▶</p>
                </div>
            </div>
            <div className="changeView">
                <p onClick={()=>setStyle('d')}>day</p>
                <p onClick={()=>setStyle('w')}>week</p>
                <p onClick={()=>setStyle('m')}>month</p>
            </div>
        </div>
    )
}