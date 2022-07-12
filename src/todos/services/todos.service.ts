import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { TodoEntity } from "../../entities/todo.entity";
import { CreateTodosInput } from "../../input/create-todos.input";
import { UpdateTodosInput } from "../../input/update-todos.input";
import { ProjectsService } from "../../projects/services/projects.service";
import { CreateProjectsInput } from "../../input/create-projects.input";
import { ProjectsEntity } from "../../entities/projects.entity";

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>
  ) {}

  async createTodo(todoInput: CreateTodosInput): Promise<TodoEntity> {
    return await this.todoRepository.save({...todoInput})
  }

  async getTodosAsync(id: number): Promise<TodoEntity[]> {
    return await this.todoRepository.find({where: { projectsId: id }, order: { id: "ASC" }})
  }

  async updateTodo(updateTodo: UpdateTodosInput): Promise<TodoEntity> {
    await this.todoRepository.update({id: updateTodo.id}, {...updateTodo})
    return await this.todoRepository.findOne({where: { id: updateTodo.id }})
  }

  async deleteTodos(id: number): Promise<number> {
    await this.todoRepository.delete({projectsId: id})
    return id
  }
}