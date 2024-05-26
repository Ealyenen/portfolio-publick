import {gql} from "@apollo/client";

export const CREATE_APPOINTMENT = gql`
  mutation createAppointment($input: AppointmentInput) {
    createAppointment(input: $input) {
        appointment{
          appointmentId
          center{
            id
            name
          }
          doctor{
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

export const UPDATE_APPOINTMENT = gql`
  mutation updateAppointment($input: AppointmentInput) {
      updateAppointment(input: $input) {
          ok
          errors
          appointment{
            appointmentId
            complaints
          }
      }
    }
`

export const UPDATE_APPOINTMENT_FAST_TITLES_PHOTO = gql`
  mutation updateAppointment($input: AppointmentInput) {
      updateAppointment(input: $input) {
          ok
          errors
          appointment{
               appointmentId
    date
    patient {
      lastName
      firstName
      patronymic

    }
    doctor{
      id
      firstName
      lastName
      patronymic
    }

    timeStart
    timeEnd
    timePayment
    paymentType
    reasonAppeal
    complaints
    anamnesis
    objectively
    work
    home
    recommendations
    consultation
    comment
    nextAppointment

    chequeUnits {

      id

      service {
        id
        name
        parent {id name}
      }


      price
      amount
      percentDiscount
      priceDiscount
      comment

      additionalComment
      cheque {
        id

      }
      totalPrice

    }

    cheque {
      isActive
      id
      payed
      created
      terminal {
        name
        medicalCenter {id}
      }

      units {
        id

        service {
          id
          name
          parent {id name}
        }


        price
        amount
        percentDiscount
        priceDiscount
        comment

        additionalComment
        cheque {
          id

        }
        totalPrice
      }

    }
    analyzes{

      id
      appointment{
        appointmentId
      }

      text

      eventDate
      waitingDate
      analyzeType {
        id
        name
      }

      analyzeImages{
        id
        analyze{
          id
        }
        image
      }

    }
    appointmentImages{
      id
      appointment{
        appointmentId
        center {id}
        reasonAppeal
        patient {id  }
      }

      photoType {id name order}

      rotation

      image
      imageLink
      imageName
      order
    }
            
          }
      }
    }
`

export const ESTIMETE_SEND_SERVICE = gql`
    //cant show it
`

export const DELETE_APPOINTMENT = gql`
mutation deleteAppointment($input: AppointmentDeleteInput){
  deleteAppointment(input: $input){
    ok
    errors
  }
}
`

export const DELETE_OR_SEPARATE = gql`
//cant show it
`

export const CHEQUE_UNIT_UPDATE = gql`
//cant show it
`

export const UNITE = gql`
//cant show it
`

export const CHEQUE_CREATE = gql`
//cant show it
`

export const DELETE_CHEQUE = gql`
//cant show it
`

export const CHANGE_CHEQUE_TERMINAL = gql`
//cant show it
`

export const MASS_CHEQUE_UNITS_UPDATE = gql`
//cant show it
`

export const SEND_TO_TERMINAL = gql`
//cant show it
`

export const DELETE_FROM_TERMINAL = gql`
//cant show it
`