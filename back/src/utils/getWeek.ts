export const getWeek = (date:{year:number,month:number,day:number}) => {

    const addDaysToDate = (date, n) => {
        const d = new Date(date);
        d.setDate(d.getDate() + n);
        return d;
    };

    const {year,month,day} = {...date,month:date.month-1};

    const weekDay = new Date(year,month,day).getDay()
    const dateString = new Date(year,month,day).toISOString()
    const monday = addDaysToDate(dateString,-1*weekDay + 1)
    const sunday = addDaysToDate(dateString,-1*weekDay + 7)

    const mondayDate = {year:monday.getFullYear(),month:monday.getMonth()+1,day:monday.getDate()}
    const sundayDate = {year:sunday.getFullYear(),month:sunday.getMonth()+1,day:sunday.getDate()}

    return({mondayDate,sundayDate})
}