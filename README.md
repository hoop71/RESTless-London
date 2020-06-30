# RESTLESS London - July 16, 2020

## GraphQL N+1 Problem

tl;dr: The N+1 problem occurs when the server executes more round trips to the datastore for related or nested data than necessary resulting in inefficiencies and longer load times.

## Approaches:

### Laissez-faire: 
> With this approach, we don't concern ourselves with much. We are getting back the data that we requested and we aren't asking any more questions about it. In the short run, with small data sets and few users, this approach will likely be adequate and no result in too much pain. We should look to be more thoughtful for any production application.

### JOINs:
> JOINs are common  in SQL land. Here they are likely to be fast and performant just like other places where you use them. In GraphQL land, we can find ourselves fetching unessecary data if we aren't careful and the logic to conditionally create joins can become complex quickly.

> [To Join Or Not To Join](https://medium.com/@benmorel/to-join-or-not-to-join-bba9c1377c10)

### Dataloader: 
  > DataLoader is a generic utility to be used as part of your application's data fetching layer to provide a simplified and consistent API over various remote data sources such as databases or web services via batching and caching.

  > [Dataloader Package](https://www.npmjs.com/package/dataloader)


## Repo Info:

> Clone: https://github.com/hoop71/RESTless-London

### Installation: 
> From root, yarn || npm i 

### DB setup: 
> `cd db`

> `npx sequelize db:migrate ` 

> `npx sequelize db:seed:all`


### Tools: 
> ORM: [Sequelize](https://sequelize.org/master/)

> VSCode Extension: [SQLTools](https://github.com/mtxr/vscode-sqltools.git)

