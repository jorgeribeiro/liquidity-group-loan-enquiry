import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { AppController } from './app.controller';

const config: SqliteConnectionOptions = {
  type: "sqlite",
  database: "loanDB",
  entities: [],
  synchronize: true
}

@Module({
  imports: [TypeOrmModule.forRoot(config)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
