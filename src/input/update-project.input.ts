import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateProjectInput {
    @Field(type => Int)
    id: number;

    @Field()
    title: string;
}