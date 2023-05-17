import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('loans')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllLoans() {
    return this.appService.getAllLoans();
  }

  @Get("/:id")
  getLoanById(@Param() params: { id: number }) {
    return this.appService.getLoanById(params.id);
  }

  @Get("/defaulted/:year")
  getDefaultedLoansByYear(@Param() params: { year: number }) {
    return this.appService.getDefaultedLoansByYear(params.year);
  }
}
