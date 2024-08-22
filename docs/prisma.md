# Prisma

## good to know

as we use multiple database, error handling with as described [here](https://www.prisma.io/docs/orm/prisma-client/debugging-and-troubleshooting/handling-exceptions-and-errors) will be IMPOSIBLE for now.

as example as we use `PrismaClientKnownRequestError` it will be depend on which client we generate. it is because `Prisma.PrismaClientKnownRequestError` will refer to the last generate client

as solution we create `PrismaCustomError`

## CREATE USER

later we MUST revoke unnecessary permissions

```sql
/*
Commands must be executed while connected to the right database - eventdb. Make sure of it.
*/

GRANT USAGE ON SCHEMA public TO eventuser;

grant create on schema public to eventuser;

GRANT ALL  ON ALL TABLES IN SCHEMA public TO eventuser;

GRANT ALL  ON ALL SEQUENCES IN SCHEMA public TO eventuser;
```


```sh
# pnpm prisma db pull --schema=./src/prisma/db-event/schema.prisma

pnpm prisma db push --schema=./src/prisma/db-event/schema.prisma

pnpm prisma generate --schema=./src/prisma/db-event/schema.prisma

```
