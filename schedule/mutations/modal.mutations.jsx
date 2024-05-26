import { gql } from "@apollo/client";

export const CREATE_SHEDULE = gql`
mutation createSchedule($input: ScheduleEntryInput) {
  createSchedule(input: $input) {
    schedule{
      id
        isActive
        isInfo
        isStudent
        isNewPatient
        dateTimeStart
        dateTimeEnd
        timeStart
        timeEnd
        description
        patient{
          id
          age
          birthday
          lastName
          firstName
          patronymic
          isPrepaidService
          source{
            id
            name
          }
          balance{
            id
            value
          }
        }
        status{
          id
          name
        }
        specialist{
          id
          lastName
          firstName
          patronymic
        }
    }
  ok
  errors
  }
}
`

export const UPDATE_SHEDULE = gql`
mutation updateSchedule($input: ScheduleEntryInput) {
    updateSchedule(input: $input) {
    ok
    errors
    schedule{
      id
        isActive
        isInfo
        isStudent
        isNewPatient
        dateTimeStart
        dateTimeEnd
        timeStart
        timeEnd
        description
        patient{
          id
          age
          birthday
          lastName
          firstName
          patronymic
          isPrepaidService
          source{
            id
            name
          }
          balance{
            id
            value
          }
        }
        status{
          id
          name
        }
        specialist{
          id
          lastName
          firstName
          patronymic
        }
    }
  }
}
`

export const DELETE_SHEDULE = gql`
mutation deleteSchedule($scheduleEntryId: ID) {
    deleteSchedule(scheduleEntryId: $scheduleEntryId) {
  ok
  errors
  }
}
`

export const CREATE_PATIENT = gql`
mutation createPatient($input: PatientInput){
  createPatient(input: $input){
    patient{
      id
      lastName
      firstName
      patronymic
      birthday
      age
      isPrepaidService
      phones{
        id
        number
        type{
          id
          type
        }
        isDefault
        order
        hasOrder
      }
    }
    ok
    errors
  }
}
`
export const SEND_SMS = gql`
mutation sendSms($input: SmsMessageInput){
  createSmsMessage(input: $input){
    smsMessage{
      id
      scheduleEntry{
        id
      }
    }
    ok
    errors
  }
}
`

export const SEND_PREPAYMENT = gql`
  // cant show it( sorry
`

export const DELETE_SMS = gql`
mutation deleteSmsMessage($smsId: ID!){
  deleteSmsMessage(smsId: $smsId){
    ok
    errors
  }
}
`