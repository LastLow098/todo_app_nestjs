import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ProjectsModule } from './projects/projects.module';
import { TodosModule } from './todos/todos.module';
import ormSettings from "../ormconfig"


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRoot(ormSettings),

    TodosModule,
    ProjectsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
