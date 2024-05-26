import {
  gql
} from "@apollo/client";


export const BALANCES = gql `
query balances(
  $isActive:Boolean,
  $isPatient:Boolean,
  $limit:Int,
  $offset:Int,
  $ordering:String
  ){
  balancePatients(
    isActive: $isActive, 
    isPatient: $isPatient,
    limit: $limit,
    offset: $offset,
    ordering: $ordering
    ){
      totalCount
      results{
        id
        firstName
        lastName
        patronymic
        balance{
          id
          value
        }
      }
  }
}
`