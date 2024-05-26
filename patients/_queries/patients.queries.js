import {
  gql
} from "@apollo/client";

export const SEARCH_PATIENT = gql `
  query searchPatient($q: String, $isActive: Boolean){
    searchPatient(q: $q, isActive: $isActive){
      id
      created
      lastName
      firstName
      patronymic
      birthday
      formatBirthday
      age
      isPatient
      balance {
      id
      value
      }
      transactions{
        amount
      }
    }
  }
`

export const PATIENT_QUESTIONARY = gql `
query patient($id: ID){
  patient(id: $id){
    questionnaireFileLink
  }
}
`

export const PATIENT_CARD = gql `
  query patient($id: ID){
    patient(id: $id){
      hasExpectedAnalyzes
      hasUnansweredAnalyzes
      questionnaireFileLink
      isActive
      isPatient
      lastName
      firstName
      patronymic
      sex
      created
      advanceAddress
      passport
      birthday
      formatBirthday
      age
      comment
      sendEmail
      publicPhoto
      contractFile
      contractFileLink
      contract
      
      isManagementGroup
      
      ownerAdmin {
        id
        lastName
        firstName
        patronymic
      }
      
      isPrepaidService
      
      source {
        id
      }
      sourceDescription
      supplementaryAgreement
      city {
        id
        name
      }
      manager {
        id
        lastName
        firstName
        patronymic
      }
      metro {
        id
        name
      }
      balance{
        value
      }
      transactions{
        id
        created
        amount
        comment
        typeTransaction
        doctor{
          id
          lastName
          firstName
          patronymic
          isActive
          position{
            id
            name
          }
        }
      }
      parents{
        id
        parent{
          id
          firstName
          lastName
          patronymic
        }
        parentComment
      }
      emails{
        id
        emailAddress
        comment
        isDefault
        type {
          id
          type
        }
      }
      phones {
        ruNumber
        hasOrder
        order
        id
        number
        type{
          id
          type
        }
        comment
        isSms
        isDefault
      }
      socialNetworks {
        id
        nickname
        comment
        
        networkType {
        id
        type
        }
        
      }
      sendSms
      diseases{
        id
        toRepresentation
        comment
        
        disease{
          id
          isActive
          name
          
        }
      }
      
      individualDiseases{
        id
        comment
        toRepresentation
        name
      }
    }
    allAnalyzeTypes{
      id
      name
    }
    allAnalyzeSelectedPatient(id: $id){
      id
      appointment{
        appointmentId
      }
      eventDate
      additionInformation
      status
      analyzeType{
        id
        name
      }
    }
  }
`

//
export const PATIENT_EDIT_CARD_INFORMATION = gql `
  query patient($id: ID){
    patient(id: $id){

      isActive
      isPatient
      lastName
      firstName
      patronymic
      sex
      created
      advanceAddress
      passport
      birthday
      formatBirthday
      age
      comment
      sendEmail
      publicPhoto
      contractFile
      contractFileLink
      contract
      
      isNoCalc
      
      isManagementGroup
      recommendation
      
      source {
        id
      }
      sourceDescription
      supplementaryAgreement

      city {
        id
        name
      }

      manager {
        id
        lastName
        firstName
        patronymic
      }
      
      ownerAdmin {
        id
        lastName
        firstName
        patronymic
      }

      metro {
        id
        name
      }


      parents{
        id
        parent{
          id
          firstName
          lastName
          patronymic
        }
        parentComment
      }

      emails{
        id
        emailAddress
        comment
        isDefault
        type {
          id
          type
        }
      }

      phones {
        ruNumber
        hasOrder
        order
        id
        number
        fNumber
        type{
          id
          type
        }
        comment
        isSms
        isDefault
      }

      socialNetworks {
        id
        nickname
        comment

        networkType {
        id
        type
        }

      }
      sendSms

      diseases{
        id
        toRepresentation
        comment

        disease{
          id
          isActive
          name

        }
      }

      individualDiseases{
        id
        comment
        toRepresentation
        name
      }
    }


  }
`

export const GET_METRO = gql `
  query allMetro{
    allMetro {
      id
      name
    } 
  }
`

export const GET_CITY = gql `
  query cities{
    cities {
      id
      name
    } 
  }
`

export const GET_ADMINISTRATOR = gql `
  query allAdministrators{
    allAdministrators {
      id
      firstName
      lastName
      patronymic
      isActive
      
      email
      
    } 
  }
`

export const GET_SOURCE = gql `
  query sources{
    sources {
      id
      created
      name
      isActive
    } 
  }
`
export const GET_DISEASES = gql `
query diseases{
    diseases {
      id
      name
      comment
      order
  }}
`

export const GET_PHONES = gql `
query phoneTypes{
  phoneTypes {
    id
    type
  }
}
`

export const GET_USERS = gql `
query allUsers{
  allUsers {
    id
    firstName
    lastName
    patronymic
    isAdministrator
    email
  }
}
`

export const PATIENT_CARD_PREPAYED = gql `
query patient($id: ID){
    patient(id: $id){
    isPrepaidService
  }}
`

export const GET_ALL_APP = gql `
query eventsSelectedPatient($patientId: ID!, $eventDatetimeStart_Gte: DateTime, $eventDatetimeEnd_Lte: DateTime, $limit: Int, $offset: Int, $isActive: Boolean, $ordering:String){
  eventsSelectedPatient(patientId: $patientId, eventDatetimeStart_Gte: $eventDatetimeStart_Gte, eventDatetimeEnd_Lte: $eventDatetimeEnd_Lte, limit: $limit, offset: $offset, isActive: $isActive, ordering:$ordering){

    pageInfo{
      hasNextPage
      hasPreviousPage
    }
    totalCount    
    
    results{
    
      isActive
      id
      eventDatetimeEnd
      eventDatetimeStart
      created

      prepayment{
        id
        comment
        created
        payed
        status
        creator {
          id
          firstName
          lastName
          patronymic
        }
        totalPrepayment
        }
      
      infoRecord {
        id
        created
        text
        patient {
          id
        }
        isActive
        images {
          id
          order
          imageLink
          imageName
          image1600Link
          image300Link
        }
        event{
          id
        }       
      }
      
      smsMessage {
        id
        phone {id number type {id type}}
        admin {id firstName lastName patronymic}
        text
        status
        dispatch
        delivered
        smsProviderId
        scheduleEntry {date timeStart timeEnd dateTimeStart dateTimeEnd}
        patient {id lastName firstName patronymic}
      }
      
      call {
        phoneObject{
          id
          type{
            id
            type
          }
          order
          hasOrder
        }
        id
        date
        time
        caller
        callSource
        comment
        status
        reasons{
          id
          name
          parent{
            id
            name
          }
        }
        linkToRecord
        direction
        
        phoneObject {
          id
          hasOrder
          order
        }
        
        patient {
          id
          firstName
          patronymic
          lastName
          
        }     
      }
      
      schedule{
        id
        isActive
        timeStart
        timeEnd
        date
        description       
        isStudent       
        created        
        dateTimeStart
        dateTimeEnd        
        created        
        creator {
        id
        firstName
        lastName
        patronymic
        
        position {id}              
        }
        
        status {
        id
        name        
        }
        
        specialist {        
        id
        firstName
        lastName
        patronymic
        }
        
        medicalCenter {
        id
        name
        }
        
      }
      
      patient{
        lastName
        firstName
        patronymic
        id
        birthday    
      }
      
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
            color
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
          
          totalChequePrice
          
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
        
        activeCheques {
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
            color
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
          additionInformation
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
          
          photoType {id name }

          rotation
          
          image
          imageLink
          image1600Link
          image300Link
          imageName
          order
        }               
      }      
    }   
  } 
}
`

export const GET_ADDITION_BY_ID = gql `
query infoRecord($id: ID){
  infoRecord(id: $id){
    id
    text
    patient {
      lastName
      firstName
      patronymic
    }
    event {
    eventDatetimeStart
    }
    images{
      id
      imageLink
      image1600Link
      image300Link
      imageName
      image
      order
    }
  }
}
`

export const SMS_TEXTES = gql `
query smsTemplates{
  allSmsTemplates{
    id
    text
    identifier
  }
}
`

export const GET_PHOTO_TYPES = gql `
query photoTypesByPhotoId($id: ID!){
  photoTypesByPhotoId(id: $id){
    id
    parent {id name }
    name
    order
    isGroup
    children {id name parent  {id name isEnabled} isEnabled}
    isEnabled
  }
}
`

export const PATIENT_COMMON_INFO = gql `
query patientBaseInfo($id: ID){
  patient(id: $id){
    lastName
    firstName
    patronymic
    isPatient
    age
    birthday
    created
    comment
    isPrepaidService
    sendSms
    phones{
      id
      number
      isDefault
      ruNumber
      hasOrder
      order
      ruNumber
      isSms
      comment
      type{
        type
      }
    }
    balance{
      id
      value
    }
    questionnaires{
      id
      fileName
      fileLink
    }
    parents{
      id
      parentComment
      parent{
        id
        lastName
        firstName
        patronymic
      }
    }
  }
}
`

export const PATIENT_ILLNESES = gql `
query patientIllneses($id: ID){
  patient(id: $id){
    diseases{
      id
      comment
      disease{
        name
      }
      toRepresentation
    }
    individualDiseases{
      id
      comment
      name
      toRepresentation
    }
  }
}
`

export const PATIENT_ANALISIS = gql `
query patientAnalisis($id: ID){
  allAnalyzeTypes{
    id
    name
  }
  allAnalyzeSelectedPatient(id: $id){
    id
    appointment{
      appointmentId
      event{
        eventDatetimeStart
        eventDatetimeEnd
      }
    }
    appointmentDate
    analyzeType{
      id
    }
    status
    additionInformation
  }
}
`

export const PATIENT_EVENTS = gql `
query eventsSelectedPatient(
  $patientId: ID
  $limit: Int
  $offset: Int
  $ordering: String
  $isActive: Boolean
  $eventDatetimeStart_Gte: DateTime
  $eventDatetimeEnd_Lte: DateTime

  $infoRecord_Isnull: Boolean
  $appointment_Isnull: Boolean
  $schedule_Isnull: Boolean
  $call_Isnull: Boolean
  $smsMessage_Isnull: Boolean
  $prepayment_Isnull: Boolean
){
  eventsSelectedPatient(
    patientId: $patientId
    limit: $limit
    offset: $offset
    ordering: $ordering
    isActive: $isActive
    eventDatetimeStart_Gte: $eventDatetimeStart_Gte
    eventDatetimeEnd_Lte: $eventDatetimeEnd_Lte
    infoRecord_Isnull: $infoRecord_Isnull
    appointment_Isnull: $appointment_Isnull
    schedule_Isnull: $schedule_Isnull
    call_Isnull: $call_Isnull
    smsMessage_Isnull: $smsMessage_Isnull
    prepayment_Isnull: $prepayment_Isnull
){
  totalCount
  results{
    id
    eventDatetimeStart

    infoRecord{
      id
      text
      images{
        id
        rotation
        imageLink
        image1600Link
        image300Link
        imageName
        order
      }
    }

    appointment{
      appointmentId
      date
      timeStart
      timeEnd
      isDone
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
      manager{
        id
        lastName
        firstName
        patronymic
      }
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
      patient{
        id
      }
      analyzes{
        id
        text
        eventDate
        analyzeType{
          id
          name
        }
        status
        additionInformation
        analyzeImages{
          id
          rotation
          imageLink
          imageName
          image1600Link
          image300Link
          order
        }
      }
      appointmentImages{
        id
        order
        rotation
        imageLink
        image1600Link
        image300Link
        imageName
        photoType{
          id
          name
        }
      }
      chequeUnits{
        id
        price
        amount
        percentDiscount
        priceDiscount
        comment
        additionalComment
        totalPrice
        service{
          id
          name
          color
          parent{
            id
            name
          }
        }
      }
      activeCheques{
        id
        pId
        payed
        terminal{
          id
          name
        }
        prepayment
        totalChequePrice
        units{
          id
          price
          amount
          percentDiscount
          priceDiscount
          comment
          additionalComment
          totalPrice
          service{
            id
            name
            color
            parent{
              id
              name
            }
          }
        }
      }
    }

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
      duration
      time
      reasons{
        id
        name
      }
      comment
      linkToRecord
      direction
      status
      date
      assessment
      phoneObject{
        id
        type{
          id
          type
        }
        comment
        order
        hasOrder
        ruNumber
      }
    }

    smsMessage{
      id
      admin{
        id
        lastName
        firstName
        patronymic
      }
      phone{
        id
        type{
          id
          type
        }
        comment
        order
        hasOrder
        ruNumber
      }
      text
      status
      dispatch
    }

    prepayment{
      id
      status
      payed
      created
      creator{
        id
        lastName
        firstName
        patronymic
      }
      totalPrepayment
      comment
    }
  }
}
  }
`

export const REASONS = gql`
query allReasons{
  allReasons{
		id
    name
    children{
      id
      name
    }
  }
}
`

export const CALL_REASONS = gql`
  query call($callId: ID!){
    call(callId: $callId){
      id
      reasons{
        id
        name
        parent{
          id
          name
        }
      }
      comment
      status
      direction
    }
  }
`

export const APPOINTMENT_EVENT = gql`
query appointment($id: ID) {
  appointment(id: $id){
    event{
      id
    eventDatetimeStart

    infoRecord{
      id
    }

    appointment{
      appointmentId
      date
      timeStart
      timeEnd
      isDone
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
      manager{
        id
        lastName
        firstName
        patronymic
      }
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
      patient{
        id
      }
      analyzes{
        id
        text
        eventDate
        analyzeType{
          id
          name
        }
        status
        additionInformation
        analyzeImages{
          id
          rotation
          imageLink
          imageName
          image1600Link
          image300Link
          order
        }
      }
      appointmentImages{
        id
        order
        rotation
        imageLink
        image1600Link
        image300Link
        imageName
        photoType{
          id
          name
        }
      }
      chequeUnits{
        id
        price
        amount
        percentDiscount
        priceDiscount
        comment
        additionalComment
        totalPrice
        service{
          id
          name
          color
          parent{
            id
            name
          }
        }
      }
      activeCheques{
        id
        pId
        payed
        terminal{
          id
          name
        }
        prepayment
        totalChequePrice
        units{
          id
          price
          amount
          percentDiscount
          priceDiscount
          comment
          additionalComment
          totalPrice
          service{
            id
            name
            color
            parent{
              id
              name
            }
          }
        }
      }
    }

    schedule{
      id
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
    }
  }
}
`

export const INFO_BLOCK_EVENT = gql`
query infoRecord($id: ID) {
  infoRecord(id: $id){
    event{
      id
    eventDatetimeStart

    infoRecord{
      id
      text
      images{
        id
        rotation
        imageLink
        image1600Link
        image300Link
        imageName
        order
      }
    }

    appointment{
      appointmentId
    }

    schedule{
      id
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
    }
  }
}
`

export const CALL_EVENT = gql`
query call($callId: ID!) {
  call(callId: $callId){
    event{
      id
    eventDatetimeStart

    infoRecord{
      id
    }

    appointment{
      appointmentId
    }

    schedule{
      id
    }

    call{
      id
      duration
      time
      reasons{
        id
        name
      }
      comment
      linkToRecord
      direction
      status
      date
      assessment
      phoneObject{
        id
        type{
          id
          type
        }
        comment
        order
        hasOrder
        ruNumber
      }
    }

    smsMessage{
      id
    }

    prepayment{
      id
    }
    }
  }
}
`

export const LOG_PATIENT_BALANCE_LIST = gql`
query logPatientBalanceList($patientId: ID) {
  logPatientBalanceList(patientId: $patientId){
    id
    created
    operationShow
    sourceShow
    calcOperation
    user{
      id
      lastName
      firstName
      patronymic
    }
    value
    comment
    isActive
  }
}
`