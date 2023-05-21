import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LoanService } from './loan.service';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @MessagePattern({ cmd: "getLoanById" })
  getById(id: number) {
    return this.loanService.findOne(id);
  }

  @MessagePattern({ cmd: "getDefaultedLoansByYear" })
  getDefaultedByYear(params: { year: number, currency?: string }) {
    return this.loanService.findDefaultedByYear(params.year, params.currency);
  }

  @MessagePattern({ cmd: "getDefaultDistribution" })
  async getDefaultDistribution(params: { startDate: string, endDate: string }) {
    return this.loanService.findLoansDistributionInDateRange(params.startDate, params.endDate);
  }

  @MessagePattern({ cmd: "getLoansByYear" })
  getLoansByYear(params: { year: number, default?: string, job?: string, marital?: string, education?: string }) {
    return this.loanService.findLoansByYear(
      params.year,
      params.default,
      params.job,
      params.marital,
      params.education
    );
  }
}