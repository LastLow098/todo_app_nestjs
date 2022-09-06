import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

const options: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "poijklkjn",
  database: "dbtestnest",
  entities: ["dist/**/*.entity.js"],
  synchronize: true,
  logging: false,
  dropSchema: false
}

export default options;

// TypeOrmModule.forRoot({
//   "type": "postgres",
//   "host": "ec2-3-217-14-181.compute-1.amazonaws.com",
//   "port": 5432,
//   "username": "vraiehrupfqzwu",
//   "password": "6aed25e0fbedab8cddb5f74c04b204ab01f1c9bba4e974d9be5433441de4b34e",
//   "database": "d1scii5qo06fub",
//   "entities": ["dist/**/*.entity.js"],
//   "synchronize": true,
//   "logging": false,
//   "dropSchema" : false,
//   "url": "postgres://vraiehrupfqzwu:6aed25e0fbedab8cddb5f74c04b204ab01f1c9bba4e974d9be5433441de4b34e@ec2-3-217-14-181.compute-1.amazonaws.com:5432/d1scii5qo06fub",
//   "ssl": { "rejectUnauthorized": false }
// }),