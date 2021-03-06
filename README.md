# Product API

API with PostgreSQL, Typescript, TypeORM and Type-GraphQL

## Getting Started

### Local setup

:warning: `.env` file in root is required to fill the variables in `ormconfig.ts`.

The following format is used:

```
SERVER_PORT =
DB_HOST =
DB_PORT =
DB_NAME =
DB_USER =
DB_PASS =
DB_URL = postgres://postgres:secret_passw0rd@localhost:5432/database
```

Install all required dependencies:

```
npm install
```

Create table according to migrations (requires running PostgreSQL database):

```
npm run create-table
```

Start the development server:

```
npm run dev
```

### With Docker

:warning: When using Docker, create a `.docker.env` file which is read by the `docker-compose.yml` file.\
For `.docker.env`, set the variables according to this URL string, as it needs to align with the Docker settings:

```
SERVER_PORT = 5000
DB_HOST = postgres
DB_PORT = 5432
DB_NAME = database
DB_USER = postgres
DB_PASS = secret_passw0rd
DB_URL = postgres://postgres:secret_passw0rd@postgres:5432/database
```

Starting Docker (requires local Docker/docker-compose installation):

```
docker-compose up --build -d
```

### Access Apollo server

Default address:\
http://localhost:5000/graphql

## Sample Queries and Mutations

Create product

```
mutation {
  addProduct(
    ProductInput: {
    name: "test"
    tags: ["test1"]
    }
  ) {
  name
  tags
  id
  createdAt
  }
}
```

Get products

```
query {
  getProducts {
    name
    tags
  }
}
```

Get products sorted by name/date with direction and pagination

```
query Query {
  getProducts(sorting: "createdAt", direction: "DESC", limit: 1, offset: 2) {
    name
    createdAt
  }
}
```

Get product by id

```
query {
  getProduct(id: 2) {
    name
    tags
  }
}
```

Update product by id

```
mutation {
  updateProduct(
    ProductInput: {
      name: "overwritten name"
      }, id: 1
      )
      {
    name
  }
}
```

Delete product by id

```
mutation {
  deleteProduct(id: 2)
}
```
