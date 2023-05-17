import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from 'src/entities/loan.entity';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Loan])],
  providers: [LoanService],
  controllers: [LoanController]
})
export class LoanModule {}
