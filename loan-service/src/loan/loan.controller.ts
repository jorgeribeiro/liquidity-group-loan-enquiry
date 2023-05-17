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
}
