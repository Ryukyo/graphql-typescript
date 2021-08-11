# Product API

API with PostgreSQL, Typescript, TypeORM and Type-GraphQL

## Getting Started

Install all required dependencies:

```
npm install
```

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

Get products sorted by name/date with direction

```
query {
  getProducts(sorting: "name", direction: "DESC") {
    name
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
