import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoanService } from './loan.service';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @MessagePattern({ cmd: "getAll" })
  getAll() {
    return this.loanService.findAll();
  }

  @MessagePattern({ cmd: "getLoanById" })
  getById(id: number) {
    return this.loanService.findOne(id);
  }

  @MessagePattern({ cmd: "getDefaultedLoansByYear" })
  getDefaultedByYear(year: number) {
    return this.loanService.findDefaultedByYear(year);
  }

  @MessagePattern({ cmd: "getDefaultDistribution" })
  async getDefaultDistribution(params: { startDate: string, endDate: string }) {
    const loans = await this.loanService.findLoansInDateRange(params.startDate, params.endDate);
    let defaultCount = 0;
    let nonDefaultCount = 0;
    for (const loan of loans) {
      if (loan.default === "yes") {
          defaultCount++;
      } else if (loan.default === "no") {
          nonDefaultCount++;
      }
    }

    const totalCount = loans.length;
    const defaultPercentage = ((defaultCount / totalCount) * 100).toFixed(2);
    const nonDefaultPercentage = ((nonDefaultCount / totalCount) * 100).toFixed(2);

    return {
      defaultCount,
      nonDefaultCount,
      defaultPercentage: parseFloat(defaultPercentage),
      nonDefaultPercentage: parseFloat(nonDefaultPercentage),
    };
  }
}
