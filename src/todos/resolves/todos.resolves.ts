import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { TodosService } from "../services/todos.service";
import { TodoEntity } from "../../entities/todo.entity";
import { CreateTodosInput } from "../../input/create-todos.input";
import { UpdateTodosInput } from "../../input/update-todos.input";
import { ProjectsService } from "../../projects/services/projects.service";
import { ProjectsEntity } from "../../entities/projects.entity";
import { ChildProcess } from "child_process";
import { ChildEntity } from "typeorm";
import { CreateProjectsInput } from "../../input/create-projects.input";

@Resolver((of) => TodoEntity)
export class TodosResolves {
  constructor(private readonly todosService: TodosService
  ) {
  }

  @Mutation(() => ProjectsEntity)
  async createTodo(
    @Args('todo') createTodo: CreateTodosInput,
    @Args('project', { nullable: true }) createProject: CreateProjectsInput,
  ): Promise<ProjectsEntity> {
    return await this.todosService.create(createTodo, createProject);
  }
}