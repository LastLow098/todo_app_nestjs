import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from "@nestjs/config";
import { ProjectsModule } from './projects/projects.module';
import { TodosModule } from './todos/todos.module';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    // TypeOrmModule.forRoot({
    //   "type": "postgres",
    //   "host": "localhost",
    //   "port": 5432,
    //   "username": "postgres",
    //   "password": "Ll985652-*",
    //   "database": "dbtesttask",
    //   "entities": ["dist/**/*.entity.js"],
    //   "synchronize": true,
    //   "logging": false,
    //   "dropSchema": false,
    //   "url": "postgres://vraiehrupfqzwu:6aed25e0fbedab8cddb5f74c04b204ab01f1c9bba4e974d9be5433441de4b34e@ec2-3-217-14-181.compute-1.amazonaws.com:5432/d1scii5qo06fub",
    //   "ssl": { "rejectUnauthorized": false }
    // }),
    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": "ec2-3-217-14-181.compute-1.amazonaws.com",
      "port": 5432,
      "username": "vraiehrupfqzwu",
      "password": "6aed25e0fbedab8cddb5f74c04b204ab01f1c9bba4e974d9be5433441de4b34e",
      "database": "d1scii5qo06fub",
      "entities": ["dist/**/*.entity.js"],
      "synchronize": true,
      "logging": false,
      "dropSchema" : false,
      "url": "postgres://vraiehrupfqzwu:6aed25e0fbedab8cddb5f74c04b204ab01f1c9bba4e974d9be5433441de4b34e@ec2-3-217-14-181.compute-1.amazonaws.com:5432/d1scii5qo06fub",
      "ssl": { "rejectUnauthorized": false }
    }),
    ProjectsModule,
    TodosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
