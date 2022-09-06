import {Field, ID, InputType, Int} from "@nestjs/graphql";
import {PrimaryGeneratedColumn} from "typeorm";

@InputType()
export class UpdateTodosInput {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  text: string
}