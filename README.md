# Product API

API with PostgreSQL, Typescript, TypeORM and Type-GraphQL

## Getting Started

:warning: `.env` file in root is required to fill the variables in `ormconfig.ts` and when using Docker. The data should match the connection strings in the `docker-compose.yml` file
The following format is used:

```
SERVER_PORT =
DB_HOST =
DB_PORT =
DB_NAME =
DB_USER =
DB_PASS =
```

Install all required dependencies:

```
npm install
```

Start the development server

```
npm run dev
```

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
