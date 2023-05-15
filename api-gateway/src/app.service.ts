import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject("LOAN_SERVICE") private readonly loanService: ClientProxy
  ) {}

  pingLoanService() {
    const startTs = Date.now();
    const pattern = { cmd: "ping" };
    const payload = {};
    return this.loanService
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs }))
      );
  }
}
