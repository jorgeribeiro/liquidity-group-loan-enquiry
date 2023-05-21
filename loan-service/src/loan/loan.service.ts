import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Loan } from 'src/entities/loan.entity';
import { Repository } from 'typeorm';

type LoanDistribution = {
  defaultCount: number;
  nonDefaultCount: number;
  defaultPercentage: number;
  nonDefaultPercentage: number;
}

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan) private readonly loanRepository: Repository<Loan>,
    @Inject("EXCHANGE_RATE_SERVICE") private readonly exchangeRateService: ClientProxy
  ) {}

  async findOne(id: number): Promise<Loan> {
    return this.loanRepository.findOneBy({ id: id });
  }

  async findDefaultedByYear(year: number, currency?: string): Promise<Loan[]> {
    const res = await this.loanRepository
      .createQueryBuilder('loan')
      .where(`loan.default = 'yes'`)
      .andWhere(`strftime('%Y', loan.loan_date) = :year`, { year })
      .getMany();

      if (currency) {
        const exchangeRate$ = this.exchangeRateService.send({ cmd: "getExchangeRate"}, {});
        for (const loan of res) {
          exchangeRate$.subscribe((exchangeRate: number) => {
            loan.balance = loan.balance * exchangeRate;
          })
        }
      }

    return res;
  }

  async findLoansDistributionInDateRange(startDate: string, endDate: string): Promise<LoanDistribution> {
    const res = await this.loanRepository
      .createQueryBuilder('loan')
      .where(`loan.loan_date >= :startDate`, { startDate })
      .andWhere(`loan.loan_date <= :endDate`, { endDate })
      .getMany();

    let defaultCount = 0;
    let nonDefaultCount = 0;
    for (const loan of res) {
      if (loan.default === "yes") {
        defaultCount++;
      } else if (loan.default === "no") {
        nonDefaultCount++;
      }
    }

    const totalCount = res.length;
    const defaultPercentage = ((defaultCount / totalCount) * 100).toFixed(2);
    const nonDefaultPercentage = ((nonDefaultCount / totalCount) * 100).toFixed(2);

    return {
      defaultCount,
      nonDefaultCount,
      defaultPercentage: parseFloat(defaultPercentage),
      nonDefaultPercentage: parseFloat(nonDefaultPercentage),
    };
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