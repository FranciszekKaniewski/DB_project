import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import {DataSource, LessThan, MoreThanOrEqual} from 'typeorm';
import {taskValidations} from "./task.validation";
import {getWeek} from "../utils/getWeek";

@Injectable()
export class TaskService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async create(createTaskDto: CreateTaskDto) {
    const newTask = new Task();

    newTask.id = createTaskDto.id ? createTaskDto.id : null;
    newTask.title = createTaskDto.title;
    newTask.type = createTaskDto.type;

    newTask.endDate = createTaskDto.endDate
      ? createTaskDto.endDate
      : new Date(Date.now()).toUTCString();
    newTask.startDate = createTaskDto.startDate
      ? createTaskDto.startDate
      : new Date(Date.now()).toUTCString();

    if (createTaskDto.reminder) newTask.reminder = createTaskDto.reminder;

    if (newTask.type == 'hard') {
      const res = await taskValidations.hard(newTask,this.dataSource);
      if(res && !res.isSuccess) return res;

      const res2 = await taskValidations.hardInSoft(newTask,this.dataSource);
      if(res2 && !res2.isSuccess) return res2;
    }

    if(newTask.type == 'soft'){
      const res = await taskValidations.soft(newTask,this.dataSource);
      if(res && !res.isSuccess) return res;
    }

    await newTask.save();

    return { isSuccess: true, newTask };
  }

  async findAll() {
    return await Task.findBy({});
  }

  async findAllReminders(){
    return await this.dataSource.createQueryBuilder()
        .select('title,TIMESTAMPDIFF(MINUTE,NOW(),startDate) AS "leftToStart",TIMESTAMPDIFF(MINUTE,NOW(),endDate) AS "leftToEnd"')
        .from(Task, 'task')
        .where(`((TIMESTAMPDIFF(MINUTE,NOW(),startDate) < 60 AND
                   TIMESTAMPDIFF(MINUTE,NOW(),startDate) > 0) ||
                   (NOW() BETWEEN startDate AND endDate)) AND reminder = 1 AND done = 0`)
        .orderBy('endDate,startDate')
        .getRawMany();
  }

  async findAllInMonth(year,month) {
    return await Task.findBy({
      endDate: MoreThanOrEqual(`${year}-${Number(month) > 9?month:'0'+month}-01`),
      startDate: LessThan(`${year}-${Number(month)+1 > 9?Number(month)+1:'0'+(Number(month)+1)}-01`)
    });
  }

  async findAllInWeek(year,month,day) {
    const startDate = getWeek({year,month,day}).mondayDate;
    const endDate = getWeek({year,month,day}).sundayDate;

    console.log(startDate,endDate)

    return await Task.findBy({
      endDate: MoreThanOrEqual(`${startDate.year}-${Number(startDate.month) > 9 ? startDate.month : '0'+startDate.month}-${Number(startDate.day) > 9?startDate.day:'0'+startDate.day}`),
      startDate: LessThan(`${endDate.year}-${Number(endDate.month) > 9 ? Number(endDate.month):'0'+(Number(endDate.month))}-${Number(endDate.day) > 9 ? Number(endDate.day)+'T23:59:59.999Z':'0'+(Number(endDate.day))+'T23:59:59.999Z'}`)
    });
  }

  async findAllInDay(year,month,day) {
    return await Task.findBy({
      endDate: MoreThanOrEqual(`${year}-${Number(month) > 9?month:'0'+month}-${Number(day) > 9?day:'0'+day}`),
      startDate: LessThan(`${year}-${Number(month) > 9 ? month:'0'+month}-${Number(day)+1 >= 9?Number(day)+'T23:59:59.999Z':'0'+(Number(day)+'T23:59:59.999Z')}`)
    });
  }

  async findOne(id: string) {
    return await Task.findOneBy({ id });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id)

    updateTaskDto.title ? task.title = updateTaskDto.title : task.title
    updateTaskDto.startDate ? task.startDate = updateTaskDto.startDate : task.startDate
    updateTaskDto.endDate ? task.endDate = updateTaskDto.endDate : task.endDate
    task.reminder = updateTaskDto.reminder
    task.done = updateTaskDto.done

    if (task.type == 'hard') {
      const res = await taskValidations.hard(task,this.dataSource);
      if(res && !res.isSuccess) return res;
      const res2 = await taskValidations.hardInSoft(task,this.dataSource);
      if(res2 && !res2.isSuccess) return res2;
    }
    if (task.type == 'soft') {
      const res = await taskValidations.soft(task,this.dataSource);
      if(res && !res.isSuccess) return res;
    }

    await task.save();

    return { isSuccess: true, task };
  }

  async remove(id: string) {
    const del = await Task.delete({ id })
    if(del.affected<1){
      return { isSuccess: false, message: `Can't remove task ${id}`};
    }

    return { isSuccess: true, message: `Task ${id} removed!`};;
  }
}
