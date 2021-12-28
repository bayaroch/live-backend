module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'live',
  autoLoadEntities: true,
  synchronize: false,
  logging: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/**/*.js'],
  subscribers: ['dist/subscribers/**/*.js'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
