import { makeAutoObservable } from "mobx";

export default class StorePatientConnectionsInformation {

  patientClosePeople = [
    {title: "EMPTY", value: "EMPTY"},
    {title: "Мать", value: "MOTHER"},
    {title: "Отец", value: "FATHER"},
    {title: 'Сын', value: 'SON'},
    {title: 'Дочь', value: 'DAUGHTER'},
    {title: 'Жена', value: 'WIFE'},
    {title: 'Муж', value: 'HUSBAND'},
    {title: 'Внук', value: 'GRANDSON'},
    {title: 'Внучка', value: 'GRANDDAUGHTER'},
    {title: 'Бабушка', value: 'GRANDMOTHER'},
    {title: 'Дедушка', value: 'GRANDFATHER'},
    {title: 'Сестра', value: 'SISTER'},
    {title: 'Брат', value: 'BROTHER'},
    {title: 'Тетя', value: 'AUNT'},
    {title: 'Дядя', value: 'UNCLE'},
    {title: 'Племянник', value: 'NEPHEW'},
    {title: 'Племянница', value: 'NIECE'},
    {title: 'Родственник', value: 'RELATIVE'},
    {title: 'Коллега', value: 'COLLEAGUE'},
    {title: 'Куратор', value: 'TUTOR'},
    {title: 'Попечитель', value: 'TRUSTEE'},
    {title: 'Опекун', value: 'GUARDIAN'},
    {title: 'Знакомый', value: 'FAMILIAR'},
    {title: 'Соседи', value: 'NEIGHBOUR'},
    {title: 'Няня', value: 'BABYSITTER'},
  ]


  constructor() {
    makeAutoObservable(this)
  }

}

