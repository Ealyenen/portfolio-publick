import { gql } from "@apollo/client";


export const GET_SPECIALIST_AND_CENTERS = gql`
    query spesialists{
        allUsers{
        id
        lastName
        firstName
        patronymic
        isSpecialist
        }
    medicalCenters{
        id
        name
      }
    }
`

export const SEARCH_PATIENT = gql`
  query searchPatient($q: String, $isActive: Boolean){
    searchPatient(q: $q, isActive: $isActive){
      id
      lastName
      firstName
      patronymic
      isPatient
      birthday
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
  }
`

export const TABLE_DAY = gql`
query table($dateStart: Date, $dateEnd: Date, $centerId: ID, $isActive: Boolean){
    table(dateStart: $dateStart, dateEnd: $dateEnd, centerId: $centerId, isActive: $isActive){
      id
      specialist{
        id
        lastName
        firstName
        patronymic
      }
      role
      timeEnd
      timeStart
    }
  }
`

export const SOURCES_PHONE_TYPES_STATUSES = gql`
query sources{
  sources{
    id
    name
  }
  phoneTypes{
    id
    type
  }
  scheduleStatuses{
    id
    name
  }
  medicalCenters{
    id
    name
  }
  allUsers{
    id
    lastName
    firstName
    patronymic
    isSpecialist
    }
}
`

export const COMMON_INFO_FOR_WRITE = gql`
query commonInfoForWrite{
  scheduleStatuses{
    id
    name
  }
  medicalCenters{
    id
    name
  }
}
`

export const INFOCOMMENTS = gql`
  query commentOptions{
    commentOptions{
      id
      comment
    }
  }
`

export const RECORD = gql`
query getSheduleById($scheduleId: ID){
  scheduleInfo(scheduleId: $scheduleId){
    id
    delay
    specialist{
      id
      lastName
      firstName
      patronymic
    }
    medicalCenter{
      id
      name
    }
    dayTable{
      id
      timeStart
      timeEnd
      role
      specialist{
        id
        lastName
        firstName
        patronymic
      }
    }
    patient{
      id
      lastName
      firstName
      patronymic
      birthday
      isPrepaidService
      age
      phones{
        id
        number
        order
        hasOrder
        isDefault
        comment
        ruNumber
        type{
          id
          type
        }
      }
    }
    status{
      id
      name
    }
    event{
      id
      schedule{
        timeStart
        timeEnd
        description
        status {
          id
        }
      }
    }
    date
    timeStart
    timeEnd
    description
    isInfo
    isStudent
    isActive
    delay
  }
}
`

export const PREVIOUS_WRITE = gql`
query scheduleByPatient($patientId: ID){
  scheduleByPatient(patientId: $patientId){
    id
    delay
    specialist{
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
    timeStart
    timeEnd
    description
    isInfo
    isStudent
    isActive
  }
}
`

export const LOG_INFO = gql`
query scheduleLogInfo($scheduleId: ID){
  scheduleLogInfo(scheduleId: $scheduleId){
    id
    author
    timeCreation
    status
    date
    time
    specialist
    description
    patient
    isActive
    center
    isStudent
    delay
  }
}`

export const SMS_TEMPLETES = gql`
query smsTemplates{
  allSmsTemplates{
    id
    text
    identifier
  }
}
`

export const SEND_SMS = gql`
mutation sendSms($input: SmsMessageInput){
  createSmsMessage(input: $input){
    ok
    errors
  }
}
`

export const SPECIALIST_BY_DATE_CENTER = gql`
  query specialists($centerId: ID, $date: Date, $isActive: Boolean){
    tableBySpecialist(centerId: $centerId, date: $date, isActive: $isActive){
      id
      firstName
      lastName
      patronymic
      table{
        id
        timeStart
        timeEnd
      }
    }
  }
`

export const PATIENT_SOURCES = gql`
query sources{
  sources{
    id
    name
  }
}
`

export const PHONE_TYPES = gql`
query phoneTypes{
  phoneTypes{
    id
    type
  }
}
`

export const SMS_TYPES = gql`
query smsTypes {
  smsTypes{
    id
    name
  }
}
`

export const WRITE_EXIST_SMS = gql`
query smsByScheduleEntry($scheduleEntryId: ID!){
  smsByScheduleEntry(scheduleEntryId: $scheduleEntryId){
    id
    text
    status
    dispatch
    smsType{
      id
      name
    }
  }
}
`