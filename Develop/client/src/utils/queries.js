import { gql } from '@apollo/client'

export const GET_ME = gql`
    query me($_id: String) {
        me(id: $_id {
            User
        }
}`
