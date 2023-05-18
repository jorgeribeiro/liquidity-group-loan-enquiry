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

  async findOne(id: number): Promise<Loan> {
    return this.loanRepository.findOneBy({ id: id });
  }

  async findDefaultedByYear(year: number): Promise<Loan[]> {
    return this.loanRepository
      .createQueryBuilder('loan')
      .where(`loan.default = 'yes'`)
      .andWhere(`strftime('%Y', loan.loan_date) = :year`, { year })
      .getMany();
  }

  async findLoansInDateRange(startDate: string, endDate: string): Promise<Loan[]> {
    return this.loanRepository
      .createQueryBuilder('loan')
      .where(`loan.loan_date >= :startDate`, { startDate })
      .andWhere(`loan.loan_date <= :endDate`, { endDate })
      .getMany();
  }

  async findLoansByYear(
    year: number,
    dft?: string,
    job?: string,
    marital?: string,
    education?: string
    ): Promise<Loan[]> {
    const queryBuilder = this.loanRepository
    .createQueryBuilder('loan')
    .where(`strftime('%Y', loan.loan_date) = :year`, { year });

    if (dft !== undefined) {
      queryBuilder.andWhere(`loan.default = :dft`, { dft });
    }
    if (job !== undefined) {
      queryBuilder.andWhere(`loan.job = :job`, { job });
    }
    if (marital !== undefined) {
      queryBuilder.andWhere(`loan.marital = :marital`, { marital });
    }
    if (education !== undefined) {
      queryBuilder.andWhere(`loan.education = :education`, { education });
    }

    return queryBuilder.getMany();
  }
}