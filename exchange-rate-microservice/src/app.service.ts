import { Injectable } from '@nestjs/common';

const exchangeRate = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.87,
  AED: 3.95,
}

@Injectable()
export class AppService {
  async getExchangeRate(currency: string): Promise<number> {
    return exchangeRate[currency];
  }
}
