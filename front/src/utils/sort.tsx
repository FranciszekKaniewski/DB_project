import {taskType} from "../types/types";

export const sort = (a:taskType,b:taskType) => {
    if ( a.startDate < b.startDate ){
        return -1;
    }
    if ( a.startDate > b.startDate ){
        return 1;
    }
    return 0;
}