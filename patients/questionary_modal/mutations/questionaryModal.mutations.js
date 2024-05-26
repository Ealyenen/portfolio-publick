import { gql } from "@apollo/client";


export const CHANGE_QUESTIONARIES = gql `
mutation updatePatient($input: PatientInput!) {
  updatePatient(input: $input) {
      patient{
        questionnaires{
          id
          fileName
          fileLink
        }
      }
  ok
  errors
  }
}
`
