import { Module } from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectsEntity } from "../entities/projects.entity";
import { ProjectsResolver } from "./resolvers/projects.resolver";
import { TodosService } from "../todos/services/todos.service";
import { TodosModule } from "../todos/todos.module";

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsEntity]), TodosModule],
  controllers: [],
  providers: [ProjectsService, ProjectsResolver],
  exports: [],
})
export class ProjectsModule {}
