export type dateType = {
    year: number;
    month: number;
    day: number;
}
export type taskType = {
    id: string;
    title: string;
    type: 'soft'|'hard'
    startDate: string;
    endDate: string;
    reminder: boolean;
    done: boolean;
}