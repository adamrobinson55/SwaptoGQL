const { gql } = require('apollo-server-express')



const typeDefs = gql`

    type Book {
        authors: [String]
        description: String!
        bookId: String
        image: String
        link: String
        title: String
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        password: String!
        savedBooks: [Book]
    }

    type Auth {
        token: String
        user: User
    }

    input BookInput {
        authors: [String!]!
        description: String!
        title: String!
        bookId: ID!
        image: String!
        link: String!
    }

    type Query {
        me(id: ID!): User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: BookInput): User
        removeBook(id: bookId): User
        login(username: String!, password: String!): Auth
    }
`
module.exports = typeDefs