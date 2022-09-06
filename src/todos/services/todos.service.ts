import {BadRequestException, HttpException, HttpStatus, Injectable} from "@nestjs/common";
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
    private readonly todoRepository: Repository<TodoEntity>,
    private readonly projectService: ProjectsService
  ) {}

  async create(createTodo: CreateTodosInput, createProject?: CreateProjectsInput): Promise<TodoEntity> {
    if (!createProject && !createTodo.projectId || createProject && createTodo.projectId)
      throw new BadRequestException('Invalid input data');

    let { text, projectId } = createTodo
    let todo = this.todoRepository.create({ text });
    createProject ? await this.projectService.create(createProject, todo) : await this.projectService.addTodoInProject(todo, projectId);
    return await this.todoRepository.findOne({
      where: { id: todo.id },
      relations: { project: true }
    });
  }

  async findOne(id: number): Promise<TodoEntity> {
    let todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo)
      throw new BadRequestException('This todo no longer exists');

    return todo;
  }

  async update(updateTodo: UpdateTodosInput): Promise<TodoEntity> {
    return await this.todoRepository.save(updateTodo);
  }

  async changeCompleted(id: number): Promise<TodoEntity> {
    let todo = await this.findOne(id);
    todo.isCompleted = !todo.isCompleted;
    return await this.todoRepository.save(todo);
  }

  async delete(id: number): Promise<TodoEntity> {
    await this.todoRepository.delete({id});
    return await this.findOne(id);
  }
}