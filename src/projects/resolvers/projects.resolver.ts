import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProjectsService } from "../services/projects.service";
import { ProjectsEntity } from "../../entities/projects.entity";
import { CreateProjectsInput } from "../../input/create-projects.input";
import { CreateTodosInput } from "../../input/create-todos.input";
import { TodoEntity } from "../../entities/todo.entity";

@Resolver('projects')
export class ProjectsResolver {
  constructor(private readonly projectService: ProjectsService) {
  }

  @Query(() => [ProjectsEntity])
  async getProjects(): Promise<Array<ProjectsEntity>> {
    return await this.projectService.getProjects()
  }
}