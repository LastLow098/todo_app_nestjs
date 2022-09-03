import { Field, InputType } from "@nestjs/graphql";
import { TodoEntity } from "../entities/todo.entity";

@InputType()
export class CreateProjectsInput {
  @Field()
  title: string
}