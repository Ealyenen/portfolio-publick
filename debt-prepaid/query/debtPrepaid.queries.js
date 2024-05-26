import { gql } from "@apollo/client";

export const SEARCH_PATIENT = gql `
  query searchPatient($q: String, $isActive: Boolean){
    searchPatient(q: $q, isActive: $isActive){ 
      id
      lastName
      firstName
      patronymic
      birthday
    }
  }
`

export const USERS = gql `
  query users{
    allUsers{
      id
      lastName
      firstName
      patronymic
    }
  }
`

export const ALL_DEBTS = gql `
query allDebts(
  $limit: Int, 
  $offset: Int, 
  $created_Lte: DateTime, 
  $created_Gte: DateTime,
  $operationType: DutyOperationType,
  $patient_Id: ID,
  $userId: ID,
  ){
  allDebts(
    limit: $limit, 
    offset: $offset, 
    created_Lte: $created_Lte, 
    created_Gte: $created_Gte,
    operationType: $operationType,
    patient_Id: $patient_Id,
    userId: $userId,
    ){
    totalCount
    results{
      id
      created
      modified
      patient{
        id
        lastName
        firstName
        patronymic
        account
      }
      userCreated{
        id
        lastName
        firstName
        patronymic
      }
      userModified{
        id
        lastName
        firstName
        patronymic
      }
      operationType
      operationTypeShow
      paymentType
      status
      amount
      comment
      isCompleted
      isClosed
      isActive
      statusShow
      paymentTypeShow
    }
  }
}
`