import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProjectsService } from "../services/projects.service";
import { ProjectsEntity } from "../../entities/projects.entity";
import { CreateProjectsInput } from "../../input/create-projects.input";
import { CreateTodosInput } from "../../input/create-todos.input";

@Resolver('projects')
export class ProjectsResolver {
  constructor(private readonly projectService: ProjectsService) {
  }

  @Query(() => [ProjectsEntity])
  async getProjects(): Promise<Array<ProjectsEntity>> {
    return await this.projectService.getProjects()
  }

  @Mutation(() => ProjectsEntity)
  async createTodo(@Args('project') projectInput: CreateProjectsInput, @Args('createTodo') todoInput: CreateTodosInput): Promise<ProjectsEntity> {
    return await this.projectService.createTodo(projectInput, todoInput)
  }
}