import {
  gql
} from "@apollo/client";

// export const GET_APPOINTMENT_IMAGES_BY_ID = gql `
// query appointmentById($id:ID){
//   appointment(id:$id){
//     appointmentId
//
//     anamnesis
//     cheque{
//     id
//     }
//
//     appointmentImages{
//       id
//       image
//       imageLink
//       imageName
//
//       order
//       photoType{
//         id
//         name
//         order
//       }
//       rotation
//
//       appointment{
//         appointmentId
//         center{
//           id
//         }
//         patient{
//           id
//         }
//         reasonAppeal
//
//       }
//     }
//   }
// }
// `

export const GET_APPOINTMENT_IMAGES_BY_ID = gql `
query appointmentById($id:ID){
  appointment(id:$id){

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
}`