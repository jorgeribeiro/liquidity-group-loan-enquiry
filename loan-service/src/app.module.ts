import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { AppController } from './app.controller';
import { Loan } from './entities/loan.entity';
import { LoanModule } from './loan/loan.module';

const config: SqliteConnectionOptions = {
  type: "sqlite",
  database: "loanDB",
  entities: [Loan],
  synchronize: true
}

@Module({
  imports: [TypeOrmModule.forRoot(config), LoanModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
