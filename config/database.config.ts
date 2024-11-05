import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "manager_app",
    synchronize: true,
    entities: [
        `${__dirname}/src/**/entity/*.{ts,js}`,
    ],
    migrations: [`${__dirname}/src/migrations/*.{ts,js}`],
    migrationsTableName: "history-migrations",
    migrationsRun: true
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;