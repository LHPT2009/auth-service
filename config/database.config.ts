import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "manager_app",
    synchronize: false,
    entities: [`${__dirname}/../src/**/entity/*.{ts,js}`],
    migrations: [`${__dirname}/../migrations/data/*.{ts,js}`],
    migrationsTableName: "history-migrations"
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;