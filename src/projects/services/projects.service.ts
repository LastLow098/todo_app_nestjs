import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsEntity } from '../../entities/projects.entity';
import { Repository } from 'typeorm';
import { CreateProjectsInput } from '../../input/create-projects.input';
import { TodosService } from '../../todos/services/todos.service';
import { CreateTodosInput } from '../../input/create-todos.input';
import { TodoEntity } from "../../entities/todo.entity";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private readonly projectsRepository: Repository<ProjectsEntity>
  ) {}

  async create(
    createProject: CreateProjectsInput,
    todo: TodoEntity,
  ): Promise<ProjectsEntity> {
    const project = await this.projectsRepository.create(createProject);
    project.todos = [todo];
    return this.projectsRepository.save(project);
  }

  async addTodoInProject(todo: TodoEntity, id: number) {
    const project = await this.getProjectOne(id);
    project.todos = [...project.todos, todo];
    return this.projectsRepository.save(project);
  }

  async getProjectOne(id: number): Promise<ProjectsEntity> {
    return this.projectsRepository.findOne({
      relations: { todos: true },
      where: { id },
    });
  }

  async getProjects(): Promise<Array<ProjectsEntity>> {
    return await this.projectsRepository.find({
      relations: { todos: true },
      order: { id: 'ASC' },
    });
  }
}
