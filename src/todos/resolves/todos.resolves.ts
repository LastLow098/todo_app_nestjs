import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TodosService } from "../services/todos.service";
import { TodoEntity } from "../../entities/todo.entity";
import { CreateTodosInput } from "../../input/create-todos.input";
import { UpdateTodosInput } from "../../input/update-todos.input";

@Resolver('todos')
export class TodosResolves {
  constructor(private readonly todosService: TodosService) {
  }

  @Mutation(() => TodoEntity)
  async updateTodo(@Args('updateTodo') todoInput: UpdateTodosInput): Promise<TodoEntity> {
    return await this.todosService.updateTodo(todoInput)
  }
}