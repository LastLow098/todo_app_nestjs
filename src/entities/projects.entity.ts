import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { TodoEntity } from "./todo.entity";
import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { GraphQLList } from "graphql";


@Entity('Project')
@InputType('Project')
@ObjectType()
export class ProjectsEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: number

  @Field()
  @Column()
  public title: string

  @Field((type) => [TodoEntity])
  @OneToMany(() => TodoEntity, (todo) => todo.project, { cascade: true })
  public todos?: TodoEntity[]

  public fill(title: string, todos: TodoEntity[]) {
    this.title = title;
    this.todos = todos;
    return this
  }
}