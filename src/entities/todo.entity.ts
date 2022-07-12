import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity('Todo')
export class TodoEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  text: string

  @Field()
  @Column()
  isCompleted: boolean

  @Field()
  @Column()
  projectsId: number
}