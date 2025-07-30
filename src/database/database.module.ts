import { Client } from 'pg';
import { Global, Inject, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from 'src/config';

//client.query('SELECT * FROM tasks', (err, res) => {
//console.log(err);
//console.log(res.rows);
//});

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { username, host, database, password, port } =
          configService.mysql;
        return {
          type: 'mysql',
          host,
          port,
          username,
          password,
          database,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { username, host, database, password, port } =
          configService.postgres;
        const client = new Client({
          user: username,
          host,
          database,
          password,
          port,
        });

        client.connect();

        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['PG', TypeOrmModule],
})
export class DatabaseModule {}
