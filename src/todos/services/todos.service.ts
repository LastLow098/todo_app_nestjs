import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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

  async create(createTodo: CreateTodosInput, createProject?: CreateProjectsInput): Promise<ProjectsEntity> {
    if (!createProject && !createTodo.projectId) throw new HttpException('Invalid inputs', HttpStatus.BAD_REQUEST);

    let todo = await this.todoRepository.create(createTodo);
    return createProject ? await this.projectService.create(createProject, todo) : await this.projectService.addTodoInProject(todo, createTodo.projectId);
  }
}