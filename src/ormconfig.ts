import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
    type: 'postgres',
    database: process.env.POSTGRES_DATABASE || 'db',
    logging: true,
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    username: process.env.POSTGRES_USER || 'root',
    password: process.env.POSTGRES_PASSWORD || '',
    entities: ['dist/Infrastructure/Entity/**/*.js'],
    migrations: ['dist/Infrastructure/Migrations/*.js'],
    cli: {
        migrationsDir: 'src/Infrastructure/Migrations',
    },
    synchronize: false,
};

export default config;
