



const typeDefs = `

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
        token: ID
        user: User
    }

    input BookInput {
        authors: [String!]
        description: String!
        title: String!
        bookId: String!
        image: String!
        link: String!
    }

    type Query {
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: BookInput): User
        removeBook(id: String!): User
        login(username: String!, password: String!): Auth
    }
`
module.exports = typeDefs