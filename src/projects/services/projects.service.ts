import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectsEntity } from "../../entities/projects.entity";
import { Repository } from "typeorm";
import { CreateProjectsInput } from "../../input/create-projects.input";
import { TodosService } from "../../todos/services/todos.service";
import { CreateTodosInput } from "../../input/create-todos.input";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private readonly projectsRepository: Repository<ProjectsEntity>,
    private readonly todoService: TodosService
  ) {
  }

  async deleteProjects(id: number): Promise<ProjectsEntity> {
    await this.todoService.deleteTodos(id)
    let elem = this.projectsRepository.findOne({ where: {id: id} })
    await this.projectsRepository.delete({ id })
    return elem
  }

  async createTodo(projectInput: CreateProjectsInput, todoInput: CreateTodosInput): Promise<ProjectsEntity> {
    if (!projectInput.id) {
      let project = await this.projectsRepository.save({...projectInput})
      todoInput.projectsId = project.id
    }else {
      todoInput.projectsId = projectInput.id
    }
    await this.todoService.createTodo(todoInput)
    return await this.getProjectsOne(todoInput.projectsId)
  }

  async getProjectsOne(id: number): Promise<ProjectsEntity> {
    let project = await this.projectsRepository.findOne({where: {id: id}})
    project.todos = await this.todoService.getTodos(project.id)
    return project
  }

  async getProjects(): Promise<Array<ProjectsEntity>> {
    let projects =  await this.projectsRepository.find({ order: { id: "ASC" }})
    projects.forEach((elem: any) => {
      elem.todos = this.todoService.getTodos(elem.id)
    })
    return projects
  }
}
