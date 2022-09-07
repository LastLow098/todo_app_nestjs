import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { TodosService } from "../services/todos.service";
import { TodoEntity } from "../../entities/todo.entity";
import { CreateTodosInput } from "../../input/create-todos.input";
import { UpdateTodosInput } from "../../input/update-todos.input";
import { ProjectsService } from "../../projects/services/projects.service";
import { ProjectsEntity } from "../../entities/projects.entity";
import { ChildProcess } from "child_process";
import {ChildEntity, DeleteResult} from "typeorm";
import { CreateProjectsInput } from "../../input/create-projects.input";

@Resolver((of) => TodoEntity)
export class TodosResolves {
  constructor(private readonly todosService: TodosService
  ) {
  }

  @Mutation(() => TodoEntity)
  async createTodo(
    @Args('todo') createTodo: CreateTodosInput,
    @Args('project', { nullable: true }) createProject: CreateProjectsInput,
  ): Promise<TodoEntity> {
    return await this.todosService.create(createTodo, createProject);
  }

  @Mutation(() => TodoEntity)
  async changeCompleted(@Args('TodoId') id: number): Promise<TodoEntity> {
    return await this.todosService.changeCompleted(id);
  }

  @Mutation(() => TodoEntity)
  async updateTodo(@Args('updateTodo') updateTodo: UpdateTodosInput): Promise<TodoEntity> {
    return await this.todosService.update(updateTodo);
  }

  @Mutation(() => TodoEntity)
  async deleteTodo(@Args('TodoId') id: number): Promise<TodoEntity> {
    return await this.todosService.delete(id)
  }
}
