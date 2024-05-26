import { gql } from "@apollo/client";
  
export const PATIENT_QUESTIONARIES = gql`
query questionaries($id: ID){
    patient(id: $id){
      questionnaires{
        id
        fileLink
        fileName
      }
    }
  }
`