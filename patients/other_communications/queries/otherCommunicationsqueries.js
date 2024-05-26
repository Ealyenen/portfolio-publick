import { gql } from "@apollo/client";

export const USER = gql`
query user($email: String){
    userProfile(email: $email){
      lastName
      firstName
      patronymic
    }
  }
`