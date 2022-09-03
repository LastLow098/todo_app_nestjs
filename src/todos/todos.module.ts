import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoEntity } from "../entities/todo.entity";
import { TodosResolves } from "./resolves/todos.resolves";
import { TodosService } from "./services/todos.service";
import { ProjectsModule } from "../projects/projects.module";

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity]), ProjectsModule],
  controllers: [],
  providers: [TodosResolves, TodosService]
})
export class TodosModule {}
