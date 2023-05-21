import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('loans')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(":id")
  getLoanById(@Param() params: { id: number }) {
    return this.appService.getLoanById(params.id);
  }

  @Get('defaulted/:year')
  getDefaultedLoansByYear(
    @Param('year') year: number,
    @Query('currency') currency?: string,
  ) {
    return this.appService.getDefaultedLoansByYear(year, currency);
  }

  @Get("default-distribution/:startDate&:endDate")
  getDistribution(@Param() params: { startDate: string, endDate: string }) {
    return this.appService.getDefaultDistribution(params.startDate, params.endDate);
  }

  @Get()
  getLoansByYear(
    @Query('year') year: number,
    @Query('default') dft?: string,
    @Query('job') job?: string,
    @Query('marital') marital?: string,
    @Query('education') education?: string,
  ) {
    return this.appService.getLoansByYear(year, dft, job, marital, education);
  }
}
