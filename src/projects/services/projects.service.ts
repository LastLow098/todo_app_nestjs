import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsEntity } from '../../entities/projects.entity';
import { Repository } from 'typeorm';
import { CreateProjectsInput } from '../../input/create-projects.input';
import { TodosService } from '../../todos/services/todos.service';
import { CreateTodosInput } from '../../input/create-todos.input';
import { TodoEntity } from "../../entities/todo.entity";
import {UpdateProjectInput} from "../../input/update-project.input";

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
    const project = await this.projectsRepository.findOne({ relations: { todos: true }, where: { id } });
    project.todos = [...project.todos, todo];
    return await this.projectsRepository.save(project);
  }

  async update(updateProject: UpdateProjectInput): Promise<ProjectsEntity> {
    return await this.projectsRepository.save(updateProject);
  }

  async delete(id: number): Promise<ProjectsEntity> {
    let project = await this.projectsRepository.findOne({ where: {id}});
    await this.projectsRepository.delete({id});
    return project;
  }

  async getProjects(): Promise<Array<ProjectsEntity>> {
    return await this.projectsRepository.find({
      relations: {
        todos: true
      },
      order: {
        id: 'ASC',
        todos: {
          id: 'ASC'
        }
      },
    });
  }
}
