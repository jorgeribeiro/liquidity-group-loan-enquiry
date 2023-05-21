# Liquidity Group Assignment - Loan Enquiry

## Description

This is the monorepo that consists of the [API Gateway](https://github.com/jorgeribeiro/liquidity-loan-enquiry/tree/main/api-gateway), [Loan Service](https://github.com/jorgeribeiro/liquidity-loan-enquiry/tree/main/loan-service) and [Exchange Rate Microservice](https://github.com/jorgeribeiro/liquidity-loan-enquiry/tree/main/exchange-rate-microservice).

## Installation

You can find the installation steps in each directory in this repository. 
You just need `npm` to be able to install and run each module.

## Endpoints

Fetch loan by ID: `/loans/:id`

Fetch defaulted loans by year with optional foreign currency `/loans/default/:year?currency=:currency`

Fetch distribution default vs non-default for a range of dates `/loans/default-distribution/:start_range&:end_range`

Fetch loans by year with optional user parameters `/loans/by-year/:year?default=:default&job=:job&marital=:marital&education=:education`
