import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import {ConfigModule} from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import {dbConfig} from "../ormconfig";

@Module({
  imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRootAsync({ useFactory: () => dbConfig }),
      TaskModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
