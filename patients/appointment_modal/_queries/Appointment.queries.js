import {gql} from "@apollo/client";

export const COMMON_INNFO = gql`
query appointmentInfo($email: String){
    userProfile(email: $email){
      id
      lastName
      firstName
      patronymic
      isSpecialist
    }
    medicalCenters{
      id
      name
      isActive
    }
    allDoctors{
      id
      firstName
      lastName
      patronymic
      isActive
      isSpecialist
    }
    allAnalyzeTypes{
      id
      name
    }
  }
`

export const GENERAL_APPOINTMENT_INFO = gql`
query general($id: ID){
	appointment(id: $id){
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
    date
    timeStart
    timeEnd
    patient{
      id
      lastName
      firstName
      patronymic
    }
    
  }
}
`

export const ANALISIS = gql`

query general($id: ID){
	appointment(id: $id){
    date
    center{
      id
    }
    analyzes{
      id
      text
      additionInformation
      analyzeType{
        id
      }
      analyzeImages{
        id
        rotation
        imageLink
        image300Link
        imageName
      }
    }
    
  }
}
`

export const ANALISIS_NAME_HINTS = gql `
query nameHints{
  analyzePatterns{
    id
    text
  }
}
`


export const REASON_APPEAL = gql`
query general($id: ID){
	appointment(id: $id){
    reasonAppeal
  }
}
`

export const COMPLAINTS = gql`
query appointmentData($id: ID){
  appointment(id: $id){
    complaints
  }
}
`
export const ANAMNESIS = gql`
query appointmentData($id: ID){
  appointment(id: $id){
    anamnesis
  }
}
`
export const OBJECTIVELY = gql`
query appointmentData($id: ID){
  appointment(id: $id){
    objectively
  }
}
`
export const WORK = gql`
query appointmentData($id: ID){
  appointment(id: $id){
    work
  }
}
`
export const HOME = gql`
query appointmentData($id: ID){
  appointment(id: $id){
    home
  }
}
`
export const RECCOMENDATIONS = gql`
query appointmentData($id: ID){
  appointment(id: $id){
    recommendations
  }
}
`
export const CONSULTATION = gql`
query appointmentData($id: ID){
  appointment(id: $id){
    consultation
  }
}
`
export const COMMENT = gql`
query appointmentData($id: ID){
  appointment(id: $id){
    comment
  }
}
`
export const NEXT_APPOINTMENT = gql`
query appointmentData($id: ID){
  appointment(id: $id){
    nextAppointment
  }
}
`

export const PHOTO_TYPES = gql`
  query photoWrites{
    imageTypes{
      id
      name
      order
      isGroup
      children{
        id
        name
      }
    }
  }
`

export const PHOTOS = gql`
query appointmentPhoto($id: ID){
  appointment(id: $id){
    appointmentImages{
      id
      imageLink
      image300Link
      order
      rotation
      photoType{
        id
        name
      }
    }
  }
}
`

export const APPOINTMENT_CASH_AMMOUNT= gql`
//cant show it
`

export const APPOINTMENT_CHEQUE_UNITS_ALL = gql`
//cant show it
`

export const APPOINTMENT_CHEQUES_ALL = gql`
//cant show it
`

export const TERMINALS = gql`
//cant show it

`
export const PREPAYMENT_BY_PATIENT = gql`
//cant show it
`

export const PATIENT_BALANCE = gql`
//cant show it
`

export const PRICE_LIST = gql`
//cant show it
`

// export const EXISTED_COMMON = gql`

// `