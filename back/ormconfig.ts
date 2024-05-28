import { DataSource, DataSourceOptions } from 'typeorm';
import {ConfigModule} from "@nestjs/config";

ConfigModule.forRoot();
export const dbConfig: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/**/**.entity{.ts,.js}'],
    bigNumberStrings: false,
    logging: true,
    migrations: ['dist/migrations/*.js'],
    synchronize: true,
};

const dataSource = new DataSource(dbConfig);
export default dataSource;