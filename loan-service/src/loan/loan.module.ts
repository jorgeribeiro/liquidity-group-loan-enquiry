import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from 'src/entities/loan.entity';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Loan]),
    ClientsModule.register([
      {
        name: 'EXCHANGE_RATE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8889
        }
      }
    ])
  ],
  providers: [LoanService],
  controllers: [LoanController]
})
export class LoanModule {}
