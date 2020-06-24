# RESTLESS London - July 16, 2020

## GraphQL N+1 Problem

tl;dr: The N+1 problem occurs when the server executes more round trips to the datastore for related or nested data than necessary resulting in inefficiencies and longer load times.

## Approaches:

### Database Structure:

### Dataloader: 

### SQL: 


## Repo Setup
- Clone Repo
- From root, run `yarn` or `npm i` 
- DB Setup
  - `cd db`
  - From /db run:
  - `npx sequelize db:migrate ` 
  - `npx sequelize db:seed:all`