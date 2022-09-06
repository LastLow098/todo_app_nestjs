import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { Field, ID, ObjectType, InputType } from "@nestjs/graphql";
import { ProjectsEntity } from "./projects.entity";


@Entity('Todo')
@InputType('Todo')
@ObjectType()
export class TodoEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  text: string

  @Field()
  @Column( {default: false })
  isCompleted: boolean

  @Field()
  @Column()
  projectId: number;

  @Field((type) => ProjectsEntity)
  @ManyToOne(() => ProjectsEntity, (project) => project.id)
  project: ProjectsEntity;
}