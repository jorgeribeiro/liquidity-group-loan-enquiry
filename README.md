# Liquidity Group - Loan Enquiry

## Description

This is the monorepo that consists of the [API Gateway](https://github.com/jorgeribeiro/liquidity-loan-enquiry/tree/main/api-gateway), [Loan Service](https://github.com/jorgeribeiro/liquidity-loan-enquiry/tree/main/loan-service) and [Exchange Rate Microservice](https://github.com/jorgeribeiro/liquidity-loan-enquiry/tree/main/exchange-rate-microservice).

## Installation

You can find the installation steps in each directory in this repository. 
Or you can simply run `npm install` and `npm run start` in each module.

In case you are unable to run the modules via `npm run start`, just remove the `package-lock.json` file along with the `node_modules` directory and run `npm install` again.

## Endpoints

The API Gateway is configured to run on the port `3000`. So the endpoints running locally are:

1. Fetch loan by ID: 
```
http://localhost:3000/loans/:id
```

2. Fetch defaulted loans by year with optional foreign currency (supported values for currency: `USD`, `GBP`, `AED`, `EUR`):
```
http://localhost:3000/loans/default/:year?currency=:currency
```

3. Fetch distribution default vs non-default for a range of dates (date format: `YYYY-MM-DD`):
```
http://localhost:3000/loans/default-distribution/:start_range&:end_range
```

4. Fetch loans by year with optional user parameters:
```
http://localhost:3000/loans?year=:year&default=:default&job=:job&marital=:marital&education=:education
```
