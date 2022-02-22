import { gql } from '@apollo/client'

export const typeDefs = gql`
  type User {
    id: ID!
    lastName: String!
    firstName: String!
    status: String!
    age: Int!
  }
  type Post {
    lastName: String!
    firstName: String!
    status: String!
    age: String!
  }
  type delPost {
    id: ID!
  }

  type Query {
    viewer: [User]
  }

  type Mutation {
    createUser(lastName: String!, firstName: String!, status: String!, age: String!) : Post
    deleteUser(id:ID!) : delPost
  }
`
