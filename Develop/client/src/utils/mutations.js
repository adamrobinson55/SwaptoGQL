import { gql } from '@apollo/client'

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password){
            Auth
        }
    }
}
`

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password)
            Auth
    }
`

export const SAVE_BOOK = gql`
    mutation saveBook($book: BookInput) {
        saveBook(book: $book) {
            User
        }   
    }
`

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId){
            User
        }
}
`