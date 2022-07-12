import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateProjectsInput {
  @Field({ nullable: true })
  id: number

  @Field({ nullable: true })
  title: string
}