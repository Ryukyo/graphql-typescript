# graphql-typescript

API with PostgreSQL

Create Product

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

Get Products

```
query {
  getProducts {
    name
    tags
  }
}
```

Get Product By Id

```
query {
  getProduct(id: 2) {
    name
    tags
  }
}
```

Update Product by Id

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

Delete Product By Id

```
mutation {
  deleteProduct(id: 2)
}
```
