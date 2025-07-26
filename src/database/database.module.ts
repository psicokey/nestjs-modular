import { Client } from 'pg';
import { Global, Inject, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import config from 'src/config';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

//client.query('SELECT * FROM tasks', (err, res) => {
//console.log(err);
//console.log(res.rows);
//});

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
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
  exports: ['API_KEY', 'PG'],
})
export class DatabaseModule {}
