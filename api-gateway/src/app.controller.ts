import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('loans')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/:id")
  getLoanById(@Param() params: { id: number }) {
    return this.appService.getLoanById(params.id);
  }

  @Get("/defaulted/:year")
  getDefaultedLoansByYear(@Param() params: { year: number }) {
    return this.appService.getDefaultedLoansByYear(params.year);
  }

  @Get("default-distribution/:startDate&:endDate")
  getDistribution(@Param() params: { startDate: string, endDate: string }) {
    return this.appService.getDefaultDistribution(params.startDate, params.endDate);
  }
}
