import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    entities: [`${__dirname}/../src/**/entity/*.{ts,js}`],
    migrations: [`${__dirname}/../migrations/seed/*.{ts,js}`],
    migrationsTableName: "history-seeds"
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;