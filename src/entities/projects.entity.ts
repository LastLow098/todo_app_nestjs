import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { TodoEntity } from "./todo.entity";
import {Field, ID, InputType, Int, ObjectType} from "@nestjs/graphql";
import { GraphQLList } from "graphql";


@Entity('Project')
@InputType('Project')
@ObjectType()
export class ProjectsEntity {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  public id: number

  @Field()
  @Column()
  public title: string

  @Field((type) => [TodoEntity])
  @OneToMany(() => TodoEntity, (todo) => todo.project, { cascade: true })
  public todos?: TodoEntity[]
}