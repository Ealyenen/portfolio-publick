import {
  gql
} from "@apollo/client";

export const UPDATE_PATIENT = gql `
   mutation updatePatient($input: PatientInput!) {
  updatePatient(input: $input) {
    patient {
      advanceAddress
      
      city {
        id
      }
      
      isNoCalc
      
      birthday
      formatBirthday
      comment
      
      recommendation
      
      contract
      created
      diseases {
        id        
      }
     
      firstName
      id
      isActive
      isPatient
      lastName
      manager {
        id
      }
      metro {
        id
      }
      
      ownerAdmin {
        id
      }
      
      passport
      patronymic
      publicPhoto
      sendEmail
      sendSms
      sex
      source {
        id
      }
      sourceDescription
      supplementaryAgreement
      
      contractFileLink
      
      phones {
        id
        type {
          id
          type
        }
        number
        comment
        isSms
        isDefault
      }
      
      socialNetworks {
        id
        nickname
        
        networkType {
        id
        type
        }
        
      }
      
      emails {
        id
        type {
          id
          type
        }
        emailAddress
        comment
        isDefault
      }
      
      parents {
        parent {
          id
        }
        parentComment
      }
    } 
    ok
    errors
  }
}

`

export const UPDATE_PATIENT_PREPAYMENT = gql `
   mutation updatePatient($input: PatientInput!) {
  updatePatient(input: $input) {
    patient {
    isPrepaidService
    } 
    ok
    errors
  }
}

`

export const CREATE_PATIENT = gql `
  mutation createPatient($input: PatientInput!) {
  createPatient(input: $input) {
    patient {
      advanceAddress
      city {
        id
      }
      contract
      diseases {
        id        
      }
      
      socialNetworks {
        id
        nickname
        
        networkType {
        id
        type
        }
        
      }
      
      firstName
      id
      isActive
      isPatient
      lastName
      manager {
        id
      }
      metro {
        id
      }
      passport
      patronymic
      publicPhoto
      sendEmail
      sendSms
      sex
      source {
        id
      }
      sourceDescription
      supplementaryAgreement
      phones {
        id
        type {
          id
          type
        }
        number
        comment
        isSms
        isDefault
      }
      parents {
        parent {
          id
        }
        parentComment
      }
    } 
    ok
    errors
  }
}
`

export const QUESTIONARY_FILE = gql `
mutation updatePatient($input: PatientInput!) {
  updatePatient(input: $input) {
      patient{
          lastName
          firstName
      }
  ok
  errors
  }
}
`

export const CREATE_ADDITION = gql `
mutation createInfoRecord($input :InfoRecordInput){
  createInfoRecord(input: $input){
    infoRecord{
      id
    }
    ok
    errors
  }
}
`

export const UPDATE_ADDITION = gql `
mutation updateInfoRecord($input :InfoRecordInput){
  updateInfoRecord(input: $input){
    ok
    errors
  }
}
`

export const DELETE_ADDITION = gql `
mutation deleteInfoRecord($infoRecordId: ID){
  deleteInfoRecord(infoRecordId: $infoRecordId){
    ok
    errors
  }
}
`
export const SEND_SMS = gql `
mutation sendSms($input: SmsMessageInput){
  createSmsMessage(input: $input){
    ok
    errors
  }
}
`

export const UPLOAD_QUESTIONARIES = gql `
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

export const UPDATE_BALANCE = gql `
mutation updatePatientBalance($calcOperation: String, $newBalance: Decimal!, $patientId: ID!){
  updatePatientBalance(
    calcOperation: $calcOperation,
    newBalance: $newBalance,
    patientId : $patientId
  ){
    success
    msg
    balance{
      id
      value
    }
  }
}
`

export const UPDATE_APPOINTMENT_FAST_TITLES_PHOTO = gql `
  mutation updateAppointment($input: AppointmentInput) {
      updateAppointment(input: $input) {
          ok
          errors
      }
    }
`

export const UPDATE_CALL = gql `
mutation updateCall($input: CallDataInput){
    updateCall(input: $input){
        ok
        errors
    }
}
`
//

export const UPDATE_SCHEDULE = gql `
mutation updateSchedule($input: ScheduleEntryInput) {
  updateSchedule(input: $input) {
    ok
    errors
    schedule{
      event{
        id
        eventDatetimeStart
        schedule{
          id
          medicalCenter{
            id
            name
          }
          specialist{
            id
            lastName
            firstName
            patronymic
          }
          creator{
            id
            lastName
            firstName
            patronymic
          }
          status{
            id
            name
          }
          date
          created
          timeStart
          timeEnd
          description
          delay
          isStudent
          isActive
          dayTable{
            id
          }
        }

        call{
          id
        }
        smsMessage{
          id
        }
        prepayment{
          id
        }
        appointment{
          appointmentId
        }
        infoRecord{
          id
        }
      }
    }
  }
}
`