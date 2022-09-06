import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateProjectsInput {
  @Field()
  title: string
}