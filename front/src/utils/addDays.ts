export const AddDays = (date,n) => {
    const d = new Date(date.year,date.month-1,date.day);
    d.setDate(d.getDate() + n);

    return {year:d.getFullYear(),month:d.getMonth()+1,day:d.getDate()};
}