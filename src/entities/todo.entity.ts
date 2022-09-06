import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import {Field, ID, ObjectType, InputType, Int} from "@nestjs/graphql";
import { ProjectsEntity } from "./projects.entity";


@Entity('Todo')
@InputType('Todo')
@ObjectType()
export class TodoEntity {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  text: string

  @Field()
  @Column( {default: false })
  isCompleted: boolean

  @Field((type) => ProjectsEntity)
  @ManyToOne(() => ProjectsEntity, (project) => project.id)
  project: ProjectsEntity;
}