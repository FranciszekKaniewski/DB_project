import {Task} from "./entities/task.entity";
import {sqlQuery} from "./sql.querry";

export const taskValidations = {
    hard: async (task,dataSource) => {
        const x = await dataSource
            .createQueryBuilder()
            .select('*')
            .from(Task, 'task')
            .where(sqlQuery.where_hard_touch,
                {
                    id: task.id,
                    start: new Date(task.startDate),
                    end: new Date(task.endDate),
                },
            )
            .getRawOne();

        if (x)
            return {
                isSuccess: false,
                message: `Task ${x.title}(${x.type.slice(0,1)}) took that time`,
            };
    },
    soft: async (task,dataSource) => {
        if((new Date(task.endDate).getTime() - new Date(task.startDate).getTime() < 21600000)){
            return {isSuccess:false,message:`Soft have to be longer or equal 6h`}
        }
        const a = task.startDate.slice(0,10)+" "+new Date(new Date(task.startDate).setHours(new Date(task.startDate).getHours() - new Date().getTimezoneOffset()/60)).toISOString().slice(11,19)
        const b = task.endDate.slice(0,10)+" "+new Date(new Date(task.endDate).setHours(new Date(task.endDate).getHours() - new Date().getTimezoneOffset()/60)).toISOString().slice(11,19)


        const min = await dataSource.query(sqlQuery.free_time_in_min,[a,b,b,a,task.id,a,b])
        console.log(min)

        if(min[0].free_minutes < 15){
            return {isSuccess:false,message:`Soft task required 15 min free time, free time in your time range: ${min[0].free_minutes}`}
        }
    },
    hardInSoft: async (task,dataSource) => {
        const x = await dataSource
            .createQueryBuilder()
            .select('*')
            .from(Task, 'task')
            .where(`type = 'soft' 
                AND startDate <= :end 
                AND endDate >= :start`,
                {
                    type: 'soft',
                    start: new Date(task.startDate),
                    end: new Date(task.endDate),
                },
            )
            .getRawMany();

        for(let i=0;i<x.length;i++){
            const freeMinutes = await dataSource.query(sqlQuery.free_time_in_soft_in_min,
                [x[i].startDate,x[i].endDate,x[i].endDate,x[i].startDate,task.id,x[i].startDate,x[i].endDate,new Date(task.startDate),new Date(task.endDate)],
                )

            if(freeMinutes[0].free_minutes < 15){
                return {isSuccess:false,message:`Soft task required 15 min free time, free time in your time range: ${freeMinutes[0].free_minutes}`}
            };
        }
    }
}