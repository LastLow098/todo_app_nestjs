import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { TodoEntity } from "../entities/todo.entity";
import { TodosResolves } from "./resolves/todos.resolves";
import { TodosService } from "./services/todos.service";
import { ProjectsModule } from "../projects/projects.module";

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [],
  providers: [TodosResolves, TodosService],
  exports: [TodosService],
})
export class TodosModule {}
