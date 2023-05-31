# [NestJS] Loan Enquiry Application

## Description

This is a monorepo that contains three components: API Gateway, Loan Service, and Exchange Rate Microservice. The purpose of this project is to explore and learn NestJS and its microservice architecture.

## Architecture

The Loan Enquiry Application follows a microservice architecture, with the following components:

1. **API Gateway**: Acts as the entry point for all incoming requests and communicates with other services.
   - Repository: [api-gateway](https://github.com/jorgeribeiro/liquidity-loan-enquiry/tree/main/api-gateway)

2. **Loan Service**: Provides loan-related functionality and communicates with the Exchange Rate Microservice to retrieve currency exchange rates.
   - Repository: [loan-service](https://github.com/jorgeribeiro/liquidity-loan-enquiry/tree/main/loan-service)

3. **Exchange Rate Microservice**: Responsible for fetching and providing currency exchange rates to the Loan Service.
   - Repository: [exchange-rate-microservice](https://github.com/jorgeribeiro/liquidity-loan-enquiry/tree/main/exchange-rate-microservice)

## Communication

The Loan Enquiry Application utilizes the TCP protocol for inter-service communication. The API Gateway communicates with the Loan Service using TCP, and similarly, the Loan Service uses TCP to request currency exchange rates from the Exchange Rate Microservice.

## Installation and Initialization

To install and initialize the application, follow these steps in each directory of this repository:
1. Navigate to the respective directory.
2. Run `npm install` to install the dependencies.
3. Run `npm run start` to start the module.

If you encounter any issues while running the modules via `npm run start`, you can try the following troubleshooting steps:
1. Remove the `package-lock.json` file and the `node_modules` directory.
2. Run `npm install` again.

## Endpoints

The API Gateway is configured to run on port `3000`, so the endpoints running locally are:

1. **Fetch loan by ID:** 
```
http://localhost:3000/loans/:id
```

2. **Fetch defaulted loans by year with optional foreign currency:** (supported currency values: `USD`, `GBP`, `AED`, `EUR`)
```
http://localhost:3000/loans/default/:year?currency=:currency
```

3. **Fetch distribution of default vs non-default loans for a range of dates:** (date format: `YYYY-MM-DD`)
```
http://localhost:3000/loans/default-distribution/:start_range&:end_range
```

4. **Fetch loans by year with optional user parameters:**
```
http://localhost:3000/loans?year=:year&default=:default&job=:job&marital=:marital&education=:education
```

## Database

The Loan Service directory contains an [SQLite file](https://github.com/jorgeribeiro/loan-enquiry-nestjs/blob/main/loan-service/loanDB) that contains pre-existing data used by the API endpoints mentioned above. This database file is ready to be queried and returned as responses.
