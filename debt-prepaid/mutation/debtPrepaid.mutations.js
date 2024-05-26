import { gql } from "@apollo/client";

export const DELETE_DUTY = gql`
mutation deleteDuty($dutyId: ID!){
    deleteDuty(dutyId: $dutyId){
      success
      msg
      duty{
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

export const CREATE_DUTY = gql`
mutation addDuty($amount: Decimal!, $operationType: String!, $patientId: ID!, $comment: String){
  addDuty(amount: $amount, operationType: $operationType, patientId: $patientId, comment: $comment){
    success
    msg
  }
}
`

export const UPDATE_DUTY = gql`
mutation updateDuty(
  $comment: String,
  $dutyId: ID!,
  $paymentType: String,
  $status: String,
){
  updateDuty(
    dutyId: $dutyId,
    paymentType: $paymentType,
    status: $status,
    comment: $comment,
  ){
    msg
    success
    duty{
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