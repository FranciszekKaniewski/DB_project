import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  async findAll() {
    return await this.taskService.findAll();
  }

  @Get('/month/:year/:month')
  async findAllInMonth(@Param('year') year: string, @Param('month') month: string) {
    return await this.taskService.findAllInMonth(year,month);
  }

  @Get('/day/:year/:month/:day')
  async findAllInDay(@Param('year') year: string, @Param('month') month: string, @Param('day') day: string) {
    return await this.taskService.findAllInDay(year,month,day);
  }

  @Get('/week/:year/:month/:day')
  async findAllInWeek(@Param('year') year: string, @Param('month') month: string, @Param('day') day: string) {
    return await this.taskService.findAllInWeek(year,month,day);
  }

  @Get('reminder')
  async findAllReminders() {
    return await this.taskService.findAllReminders();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
