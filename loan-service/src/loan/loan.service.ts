import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Loan } from 'src/entities/loan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan) 
    private loanRepository: Repository<Loan>
  ) {}

  async findAll(): Promise<Loan[]> {
    return this.loanRepository.find();
  }

  async findOne(id: number): Promise<Loan> {
    return this.loanRepository.findOneBy({ id: id });
  }
}
