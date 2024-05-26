import {gql} from "@apollo/client";

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