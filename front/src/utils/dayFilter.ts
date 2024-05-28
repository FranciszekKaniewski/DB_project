import {dateType, taskType} from "../types/types";

export const dayFilter = (date:dateType,tasks:taskType[]) => {
    return (tasks.filter(task =>
        (new Date(task.startDate).getDate() <= date.day && new Date(task.endDate).getDate() >= date.day &&
            new Date(task.startDate).getMonth()+1 === date.month &&
            new Date(task.startDate).getFullYear() === date.year)
        ||
        (new Date(task.startDate).getDate() <= date.day && new Date(task.endDate).getDate() < date.day &&
            new Date(task.startDate).getMonth()+1 === date.month && new Date(task.endDate).getMonth()+1 > date.month &&
            new Date(task.startDate).getFullYear() === date.year)
        ||
        (new Date(task.startDate).getDate() > date.day && new Date(task.endDate).getDate() >= date.day &&
            new Date(task.startDate).getMonth()+1 < date.month && new Date(task.endDate).getMonth()+1 === date.month &&
            new Date(task.startDate).getFullYear() === date.year)
        ||
        (new Date(task.startDate).getDate() <= date.day && new Date(task.endDate).getDate() < date.day &&
            new Date(task.startDate).getMonth()+1 === date.month && new Date(task.endDate).getMonth()+1 < date.month &&
            new Date(task.startDate).getFullYear() === date.year && new Date(task.endDate).getFullYear() > date.year)
        ||
        (new Date(task.startDate).getDate() > date.day && new Date(task.endDate).getDate() >= date.day &&
            new Date(task.startDate).getMonth()+1 > date.month && new Date(task.endDate).getMonth()+1 === date.month &&
            new Date(task.startDate).getFullYear() < date.year && new Date(task.endDate).getFullYear() === date.year)
    ))
}