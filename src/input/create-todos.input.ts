import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateTodosInput {
  @Field()
  text: string

  @Field(() => Int, { nullable: true })
  projectId: number;
}