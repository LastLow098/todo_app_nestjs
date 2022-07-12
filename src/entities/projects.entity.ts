import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";
import { TodoEntity } from "./todo.entity";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { GraphQLList } from "graphql";


@Entity('Projects')
@ObjectType()
export class ProjectsEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  title: string

  @Field(() => [TodoEntity])
  todos?: TodoEntity[]
}