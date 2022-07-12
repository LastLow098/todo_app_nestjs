import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateTodosInput {
  @Field()
  text: string

  @Field({ defaultValue: false })
  isCompleted: boolean

  @Field({ nullable: true })
  projectsId: number
}