import { gql } from "@apollo/client";

export const SPECIALISTS_DAY_TABLE = gql`
query specialistsDayTable($centerId: ID, $date: Date, $isActive: Boolean){
  tableBySpecialist(centerId: $centerId, date: $date, isActive: $isActive,
  ){
    id
    firstName
    lastName
    patronymic
    table{
      id
      dateTimeStart
      dateTimeEnd
      scheduleEntries{
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
          isPrepaidService
          birthday
          lastName
          firstName
          patronymic
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
      }
    }
  }
}`