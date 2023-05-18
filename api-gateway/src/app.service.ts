import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject("LOAN_SERVICE") private readonly loanService: ClientProxy
  ) {}

  getAllLoans() {
    return this.loanService.send({ cmd: "getAll" }, {});
  }

  getLoanById(id: number) {
    return this.loanService.send({ cmd: "getLoanById"}, id);
  }

  getDefaultedLoansByYear(year: number) {
    return this.loanService.send({ cmd: "getDefaultedLoansByYear"}, year);
  }

  getDefaultDistribution(startDate: string, endDate: string) {
    return this.loanService.send({ cmd: "getDefaultDistribution"}, { startDate, endDate } );
  }
}
