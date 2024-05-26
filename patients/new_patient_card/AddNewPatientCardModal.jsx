import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SlideUpModal from "../../../_components/UI/modals/SlideUpModal";
import { Box, Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { provider, useInstance } from "react-ioc";
import StoreNewPatientCardModal, { StoreContractNewCardModal } from "./stores/store";
import { observer } from "mobx-react-lite";
import StaticPatientDataBlock from "./components/StaticPatientDataBlock"

import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import DynamicPatientDataBlock from "./components/DynamicPatientDataBlock"
import { CREATE_PATIENT } from "../_mutations/patients.mutations"
import { useMutation, useQuery } from "@apollo/client";
import { GET_ADMINISTRATOR, GET_CITY, GET_METRO, GET_PHONES, GET_SOURCE, } from "../_queries/patients.queries"

import StorePatientConnectionsInformation from "./stores/storePatientConnectionsInformation"
import StorePatientDiseases from "./stores/storePatientDiseases"
import { toJS } from "mobx"

import AllDisCreate from "./components/AllDisCreate"
import DynamicSocial from "./components/DynamicSocial"
import DiseasesDynamic from "./components/DiseasesDynamic"

import PatientConnects from "../new_patient_card/components/PatientConnects"
import FirstFormSection from "./components/FirstFormSection"
import { USER_NETWORKS } from "../../admin/query/userProfile"
import StoreEditPatientCardModal from "../edit_patient_card/stores/store"
import { FullPageFallbackProgress } from "../../../_components/UI/preloaders/FullPageFallbackProgress"
import AddIndividualDisease from "./components/AddIndividualDisease"
import { fullNameString } from "../../../_common/helpers/nameGenerationString"
import DynamicTelMultiLang from "./components/DynamicTelMultiLang"
import RichTextEditor from "../../../_components/UI/rich-text/rich.text-editor"
import { cleanStringFromSpaceUpperFirstChar } from "../../../_common/helpers/stringReplace"
import ButtonMainTimered from "../../../_components/UI/Buttons/ButtonMainTimered"

export const StyledContainer = styled(Grid)(({theme}) => ({
  pr: {xs: 2, md: 2},
  marginTop: "2rem",
  borderTop: "1px solid",
  borderColor: theme.palette.primary.light2,
}));

const AddNewPatientCardModal = provider(StoreContractNewCardModal, StorePatientConnectionsInformation, StoreEditPatientCardModal)(
  observer((props) => {

    const storeContractNewCardModal = useInstance(StoreContractNewCardModal);
    const store = useInstance(StoreNewPatientCardModal)
    const storeConnections = useInstance(StorePatientConnectionsInformation)
    const storeDiseases = useInstance(StorePatientDiseases)
    const storeEditPatientCardModal = useInstance(StoreEditPatientCardModal)
    const navigate = useNavigate();

    const {data: metro} = useQuery(GET_METRO);
    const {data: city} = useQuery(GET_CITY);
    const {data: admin} = useQuery(GET_ADMINISTRATOR);
    const {data: source} = useQuery(GET_SOURCE);
    const {data: phones} = useQuery(GET_PHONES);
    const {data: networks} = useQuery(USER_NETWORKS);
    const allNetworks = networks?.allSocialNetworks;


    const [addData] = useMutation(CREATE_PATIENT);

    const metroMoscow = metro?.allMetro
    const allCities = city?.cities
    const administrators = admin?.allAdministrators.map((el) => {
      return {id: el.id, value: el.id, title: `${el.firstName} ${el.patronymic ? el.patronymic : ""} ${el.lastName}`}
    })
    const allSources = source?.sources
    const allPhones = phones?.phoneTypes


    const [dis, setAllDis] = useState()


    useEffect(() => {

      setAllDis(toJS(storeDiseases.patientDiseases))
    }, [storeDiseases.patientDiseases]);

    const handleSetPatient = (patient) => {
      storeEditPatientCardModal.setPatient(patient)
    }

    let timeout = null;


    const handleSearchPatient = (strFind) => {

      clearTimeout(timeout);
      timeout = setTimeout(function () {
        storeEditPatientCardModal.searchPatient(strFind.replace(/ /g, ","))
      }, 200)
    }


    const [userIsPatient, setExcludedUser] = useState(true);

    const {
      register,
      handleSubmit,
      control,
      setValue,
      getValues,
      watch,
      formState: {errors},
    } = useForm({
      mode: "onChange",
      defaultValues: {
        tel: [{number: "", typeId: "", comment: "", isDefault: false, isSms: false, ruNumber: true}],
        connect: [{id: "", parentComment: ""}],
        emails: [{typeId: "1", emailAddress: "", comment: ""}],
        socialNetworks: [{networkType: "", nickname: "", comment: ""}],
        addNewUnicDisease: [{newDisease: "", comment: "", toRepresentation: false}],
        diseasesList: storeDiseases.diseasesList.length > 0 ? storeDiseases.diseasesList : storeDiseases.diseasesList.length > 0 ? storeDiseases.diseasesList : [],
        addIndividualDisease: [{name: "", comment: "", toRepresentation: false}],
      }
      //resolver: yupResolver(schema),
    });


    const {
      fields: telFields,
      append: telAppend,
      remove: telRemove,
      update: telUpdate,
    } = useFieldArray({control, name: "tel"});


    const watchFieldArray = getValues("tel");

    const newValueFromWatcherParent = useWatch({
      name: "tel",
      control
    });

    const controlledFields = telFields.map((field, index) => {
      return {
        ...field,
        ...watchFieldArray[index]
      };
    });

    const [ruNumber, setRuNumber] = useState(true)


    const handleSwitchChange = (e, index) => {

      telUpdate(index, {...newValueFromWatcherParent[index], isDefault: e.target.checked})

      newValueFromWatcherParent?.forEach((el, fieldIndex) => {

        if (index !== fieldIndex) {

          telUpdate(fieldIndex, {...el, isDefault: false})

        }
      })
    }

    const handleSwitchChangeDefNumber = (e, index) => {

      telUpdate(index, {...newValueFromWatcherParent[index], ruNumber: e.target.checked})

      newValueFromWatcherParent?.forEach((el, fieldIndex) => {

        if (index === fieldIndex) {

          telUpdate(fieldIndex, {...el, ruNumber: !el.ruNumber, number: el.number.replace(/[+(_) -]/g, '')})
        }
      })
    }

    const getOption = (item) => {

      return fullNameString(item?.lastName, item?.firstName, item?.patronymic)
    }

    const [validLastName, setValidLastName] = useState()
    const [validFirstName, setValidFirstName] = useState()


    const {
      fields: addIndividualDiseaseFields,
      append: addIndividualFieldsAppend,
      remove: addIndividualFieldsRemove
    } = useFieldArray({control, name: "addIndividualDisease"});

    const {
      fields: connectFields,
      append: connectAppend,
      remove: connectRemove
    } = useFieldArray({control, name: "connect"});

    const {
      fields: emailsFields,
      append: emailsAppend,
      remove: emailsRemove
    } = useFieldArray({control, name: "emails"});

    const {
      fields: socialFields,
      append: socialAppend,
      remove: socialRemove
    } = useFieldArray({control, name: "socialNetworks"});

    const {
      fields: addNewUnicDiseaseFields,
      append: addNewUnicDiseaseFieldsAppend,
      remove: addNewUnicDiseaseFieldsRemove
    } = useFieldArray({control, name: "addNewUnicDisease"});

// eslint-disable-next-line no-unused-vars
    const {fields} = useFieldArray({control, name: "diseasesList"});


    const parseDate = (date) => {
      if (date?.length === 10) {
        const dataArr = date.split(".")
        const year = dataArr[2]
        const month = dataArr[1]
        const day = dataArr[0]
        return year + "-" + month + "-" + day
      }
      return undefined
    }


    function saveClick(data) {

      const dateToParse = parseDate(data.birthday)

      const dataDis = data?.diseasesList.map((el) => {

        return {
          diseaseId: el.diseaseId,
          comment: el.comment,
          toRepresentation: !!el.toRepresentation ? el.toRepresentation : false,
        }
      })

      let allDisWithNew;

      const isNewDiseaseData = data?.addNewUnicDisease?.filter((el) => el.newDisease !== "")

      if (isNewDiseaseData) {
        allDisWithNew = [...dataDis, ...isNewDiseaseData]
      }


      let phones = []
      data?.tel?.forEach((el) => {

        if (el.number !== "" && el.ruNumber === true) {
          phones.push({

            typeId: el?.typeId ? el?.typeId : el?.type?.id,
            number: el.number.replace(/[+() -]/g, ''),
            comment: el.comment,
            isDefault: el.isDefault,
            isSms: el.isSms,
            ruNumber: el.ruNumber,
          })
        } else if (el.number !== "" && el.ruNumber === false) {
          phones.push({

            typeId: el?.typeId ? el?.typeId : el?.type?.id,
            number: el.number.replace(/[+(_) -]/g, ''),
            comment: el.comment,
            isDefault: el.isDefault,
            isSms: el.isSms,
            ruNumber: el.ruNumber,
          })
        }
      })


      let patientConnections = []
      data?.connect?.forEach((el) => {

        if (el.parentComment !== "") {

          patientConnections.push({
            id: el?.parent?.id ? el?.parent?.id : el?.id?.id,
            parentComment: el.parentComment
          })
        }
      })

      let emails = []
      data?.emails?.forEach((el) => {

        if (el.emailAddress !== "") {
          emails.push({
            typeId: el?.typeId ? el?.typeId : el?.type?.id,
            emailAddress: el.emailAddress,
            comment: el.comment
          })
        }
      })

      let patientSocialNetworks = []
      data?.socialNetworks?.forEach((el) => {

        if (el.nickname !== "") {
          patientSocialNetworks.push({
            networkType: el.networkType ? el.networkType : el.networkType?.id,
            nickname: el.nickname,
            comment: el.comment,
          })
        }
      })

      const individualDiseasesList = []

      data?.individualDiseasesList?.map((el) => {

        if (el.name !== "") {

          individualDiseasesList.push({
            individualDiseaseId: el.diseaseId,
            name: el.name,
            comment: el.comment,
            toRepresentation: !!el.toRepresentation ? el.toRepresentation : false,
          })
        }
      })

      const isNewIndividualDisease = data?.addIndividualDisease?.filter((el) => {

        return el.name !== ""
      })

      const allIndividualDisWithNew = [...individualDiseasesList, ...isNewIndividualDisease]

      addData({
        variables: {
          "input": {
            "firstName": cleanStringFromSpaceUpperFirstChar(data.firstName),
            "lastName": cleanStringFromSpaceUpperFirstChar(data.lastName),
            "patronymic": cleanStringFromSpaceUpperFirstChar(data.patronymic),
            "sex": data.sex,
            "isActive": true,
            "publicPhoto": data.publicPhoto,
            "sendEmail": data.sendEmail,
            "sendSms": data.sendSms,
            "birthday": dateToParse,
            "metro": !!data.metro ? {"id": data.metro.id} : {},
            "city": !!data.city ? {"id": data.city.id} : {},
            "manager": !!data.manager ? {"id": data.manager.id} : {},
            "source": data.source !== "" ? {"id": data.source} : {},
            "phones": phones,
            "newCity": data.newCity,
            "newMetro": data.newMetro,
            "newSource": data.newSource,
            "parents": patientConnections,
            "comment": storeEditPatientCardModal.commentPatientCard,
            "advanceAddress": data.advanceAddress,
            "supplementaryAgreement": data.supplementaryAgreement,
            "passport": data.passport,
            "emails": emails,
            "isPatient": data.isPatient,
            "diseases": isNewDiseaseData ? allDisWithNew : dataDis,
            "individualDiseases": allIndividualDisWithNew,
            "socialNetworks": patientSocialNetworks,
          }
        }
      }).then((data) => {


        if (data?.data?.createPatient?.errors === "") {

          store.setOpenModal(false)
          navigate(`/patients/${data?.data?.createPatient.patient.id}`)

          storeEditPatientCardModal.setCommentPatientCard("")
        }

      }).catch((error) => {

        if (error.message === "PhoneType matching query does not exist.") {
          alert("Не задан тип телефона пациента")
        }
        if (error.message === "string index out of range") {
          alert("Проверьте правильность заполнения полей")
        } else alert(`пожалуйста, исправьте: ${error}`, error)
      });

    }

    if (storeDiseases.loadDiseases === true && storeDiseases.diseasesList.length <= 0) {
      return (<FullPageFallbackProgress />)
    }

    return (
      <SlideUpModal
        open={store.openModal}
        title={'Новая карта'}
        closeClick={() => {
          store.setOpenModal(false)
        }}

        customBtn={<ButtonMainTimered
          color={"contrastLight"}
          title={"Сохранить"}
          timerTitle={"Ожидайте"}
          onClick={handleSubmit(saveClick)} />}
      >
        <form action="">
          <Grid container spacing={2} sx={{p: {xs: 2, md: 3}, pb: {xs: 5, md: 5}, pt: {xs: 5}}}>
            <Grid item xs={12} md={5}>

              <Grid container spacing={2} sx={{pr: {xs: 0, md: 2}}}>
                <Grid item xs={12}>
                  <Box>
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...register("isPatient")}
                          defaultChecked={true}
                          onChange={() => setExcludedUser(!userIsPatient)}
                        />
                      }
                      label={"пациент"}
                    />
                  </Box>
                </Grid>
              </Grid>

              <FirstFormSection
                control={control}
                register={register}
                setValue={setValue}
                errors={errors}
                storeContractNewCardModal={storeContractNewCardModal}
                allCities={allCities}
                metroMoscow={metroMoscow}
                allSources={allSources}
                userIsPatient={userIsPatient}
                administrators={administrators}
                getValues={getValues}
                validLastName={validLastName}
                setValidLastName={setValidLastName}
                validFirstName={validFirstName}
                setValidFirstName={setValidFirstName}
                getOption={getOption}
              />

              <StyledContainer container spacing={2} sx={{pr: {xs: 0, md: 2}}}>
                <StaticPatientDataBlock
                  title="Адрес для авансового платежа"
                  inputLabel="Адрес для авансового платежа"
                  textAreaLabel="Адрес для авансового платежа"
                  textAreaDefaultValue="Адрес"
                  blockHasComments
                  nameTextArea="advanceAddress"
                  textFieldId="comment-mail-multiline-static"
                  control={control}
                />
              </StyledContainer>

              <Grid container spacing={2}
                    sx={{pr: {xs: 0, md: 2}, mt: 2, borderTop: '1px solid', borderColor: 'primary.light2'}}>


                <DynamicTelMultiLang
                  fields={controlledFields}
                  addNewItem={() => {
                    telAppend({number: "", typeId: "", comment: "", isDefault: false, isSms: false, ruNumber: true});
                  }}
                  removeItem={telRemove}
                  textFieldLabelFirst="Телефон"
                  title="Телефоны (для добавления иностранного номера предварительно отключите ru)"
                  blockHasComments
                  propInputOne="number"
                  propInputTwo="typeId"
                  propInputThree="comment"
                  selectNameDynamic={"typeId"}
                  family="tel"
                  buttonDeleteText="Удалить телефон"
                  buttonAddText="Добавить "
                  options={allPhones}
                  selectLabel="Тип контакта*"
                  selectId="typeId-select"
                  selectInputLabelId="typeId-select"
                  selectLabelId="typeId-select-label"
                  control={control}
                  compositeValue
                  defValuePropInputTwo={"type"}
                  defaultValueDynamicSelect={"type.id"}
                  disabledSelect={!userIsPatient}
                  disabled={!userIsPatient}
                  getValues={getValues}
                  textAreaLabel={"Комментарий"}
                  propSwitchTel={"isDefault"}
                  register={register}
                  handleSwitchChange={handleSwitchChange}
                  telUpdate={telUpdate}
                  watch={watch}
                  errors={errors}
                  ruNumber={ruNumber}
                  setRuNumber={setRuNumber}
                  handleSwitchChangeDefNumber={handleSwitchChangeDefNumber}
                  userIsPatient={userIsPatient}
                />
              </Grid>


              <StyledContainer container spacing={2} sx={{pr: {xs: 0, md: 2}}}>
                <DynamicPatientDataBlock
                  fields={emailsFields}
                  addNewItem={() => {
                    emailsAppend({emailAddress: "", typeId: "", comment: "", isDefault: false});
                  }}
                  removeItem={emailsRemove}
                  textFieldLabelFirst="Email"
                  title="Электронная почта"
                  blockHasComments
                  propInputOne="emailAddress"
                  propInputTwo="typeId"
                  propInputThree="comment"
                  selectNameDynamic={"typeId"}
                  family="emails"
                  buttonDeleteText="Удалить email"
                  buttonAddText="Добавить "
                  options={allPhones}
                  selectLabel="Тип контакта"
                  selectId="email-select"
                  selectInputLabelId="email-select"
                  selectLabelId="email-select-label"
                  control={control}
                  compositeValue
                  textAreaDefaultValue={"comment"}
                  disabledSelect={!userIsPatient}
                  disabled={!userIsPatient}
                  textAreaLabel={"Комментарий"}
                  userIsPatient={userIsPatient}
                />
              </StyledContainer>

              <StyledContainer container spacing={2} sx={{pr: {xs: 0, md: 2}}}>
                <DynamicSocial
                  fields={socialFields}
                  addNewItem={() => {
                    socialAppend({networkType: "", nickname: "", comment: ""});
                  }}
                  removeItem={socialRemove}
                  textFieldLabelFirst="Логин"
                  title="Социальные сети"
                  blockHasComments
                  propInputOne="nickname"
                  propInputTwo="networkType"
                  propInputThree="comment"
                  selectNameDynamic={"networkType"}
                  family="socialNetworks"
                  buttonDeleteText="Удалить соц. сеть"
                  buttonAddText="Добавить"
                  options={allNetworks}
                  selectLabel="Тип контакта"
                  selectId="socialNetworks-select"
                  selectInputLabelId="socialNetworks-select"
                  selectLabelId="socialNetworks-select-label"
                  control={control}
                  compositeValue
                  textAreaDefaultValue={"comment"}
                  textAreaLabel={"Комментарий"}
                  userIsPatient={userIsPatient}
                />
              </StyledContainer>

              <StyledContainer container spacing={2} sx={{pr: {xs: 0, md: 2}}}>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    component="div"
                  >
                    Примечания
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <RichTextEditor
                    initialValue={""}
                    getValue={(value) => storeEditPatientCardModal.setCommentPatientCard(value)}
                  />
                </Grid>
              </StyledContainer>

              {userIsPatient && <PatientConnects
                allPatients={storeEditPatientCardModal.allPatients && storeEditPatientCardModal.allPatients}
                fields={connectFields}
                control={control}
                userIsPatient={userIsPatient}
                storeConnections={storeConnections}
                connectRemove={connectRemove}
                connectAppend={() => {
                  connectAppend({id: "", parentComment: ""});
                }}
                handleSetPatient={handleSetPatient}
                handleSearchPatient={handleSearchPatient}
                watch={watch}
              />}
            </Grid>

            {userIsPatient && <Grid
              item
              xs={12}
              md={7}
              sx={{
                borderLeft: {xs: "none", md: "1px solid"},
                borderColor: {md: "primary.light2"},
                marginTop: "30px",
              }}
            >

              <AllDisCreate
                fields={fields}
                control={control}
                dis={dis}
                register={register}
              />

              <DiseasesDynamic

                fields={addNewUnicDiseaseFields}
                addNewItem={() => {
                  addNewUnicDiseaseFieldsAppend({newDisease: "", comment: "", toRepresentation: false});
                }}
                removeItem={addNewUnicDiseaseFieldsRemove}
                textFieldLabelFirst="Название"
                title="Добавить новую патологию в общий список патологий"
                blockHasComments
                propInputOne="newDisease"
                propSwitch={"toRepresentation"}
                family="addNewUnicDisease"
                buttonDeleteText="Удалить "
                buttonAddText="Добавить "
                control={control}
                secondTextFieldName={"comment"}
                textFieldLabelSecond={"Комментарий"}
                disabled={!userIsPatient}
              />

              <AddIndividualDisease
                fieldName="addIndividualDisease"
                fields={addIndividualDiseaseFields}
                heading={"Добавить новую индивидуальную патологию в список патологий пациента"}
                control={control}
                disabled={!userIsPatient}
                isIndividualDiseaseNeedToRepresentation={"toRepresentation"}
                individualDiseaseName={"name"}
                individualDiseaseComment={"comment"}
                addNewItem={() => {
                  addIndividualFieldsAppend({name: "", comment: "", toRepresentation: false});
                }}
                removeItem={addIndividualFieldsRemove}
              />
            </Grid>}
          </Grid>
        </form>
      </SlideUpModal>
    );
  })
);


export default AddNewPatientCardModal;