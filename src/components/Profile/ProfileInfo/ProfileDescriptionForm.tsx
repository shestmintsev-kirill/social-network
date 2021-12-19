import { useFormik } from "formik"
import { ContactsType, ProfileType } from "../../../types/types"
import { Input, InputLow } from "../../common/FormsControls/FormsControls"

type ProfileDescriptionFormPropsType = {
  profile: ProfileType,
  authorizedUserId: number,
  errors: Array<string>
  updateProfile: (payload: ProfileType) => void,
  closeEditMode: () => void
}

type ProfileDescriptionFormValuesType = {
  fullName: string
  aboutMe: string
  lookingForAJob: boolean
  lookingForAJobDescription: string
  contacts: ContactsType
}

const ProfileDescriptionForm:React.FC<ProfileDescriptionFormPropsType> = ({ profile, closeEditMode, updateProfile, authorizedUserId, errors }) => {

  const examValue = (value:string) => {
    return value.length ? value : '';
  }

  const formik = useFormik({
    initialValues: {
      fullName: profile.fullName,
      aboutMe: examValue(profile.aboutMe),
      lookingForAJob: profile.lookingForAJob,
      lookingForAJobDescription: examValue(profile.lookingForAJobDescription),
      contacts: {
        facebook: examValue(profile.contacts.facebook),
        github: examValue(profile.contacts.github),
        instagram: examValue(profile.contacts.instagram),
        mainLink: examValue(profile.contacts.mainLink),
        twitter: examValue(profile.contacts.twitter),
        vk: examValue(profile.contacts.vk),
        website: examValue(profile.contacts.website),
        youtube: examValue(profile.contacts.youtube),
      },
    },
    onSubmit: async (values:ProfileDescriptionFormValuesType) => {
      await updateProfile({ ...values, userId: authorizedUserId });
      closeEditMode();
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        title={'Имя'}
        name={'fullName'}
        onChange={formik.handleChange}
        value={formik.values.fullName}
        placeholder={'fullName'}
      />
      <Input
        title={'Обо мне'}
        name={'aboutMe'}
        onChange={formik.handleChange}
        value={formik.values.aboutMe}
        placeholder={'aboutMe'}
      />
      <input
        name={'lookingForAJob'}
        checked={formik.values.lookingForAJob}
        onChange={formik.handleChange}
        type={'checkbox'}
      /> looking For A Job
      {
        formik.values.lookingForAJob && <Input
          title={'Описание для поиска работы'}
          name={'lookingForAJobDescription'}
          onChange={formik.handleChange}
          value={formik.values.lookingForAJobDescription}
          placeholder={'looking For A Job Description'}
        />
      }
      <Contacts contacts={formik.values.contacts} onChange={formik.handleChange} errors={errors} />
      <div>
        <button
          type={'submit'}
        >
          Send
        </button>
      </div>
      {!!errors.length && errors.map((err:string, index:number) => <div key={index} style={{ color: 'red' }}><strong>Ошибка: </strong>{err}</div>)}
    </form>
  )
}


type ContactsPropsType = {
  contacts: any,
  onChange: any,
  errors: Array<string>
}

const Contacts:React.FC<ContactsPropsType> = ({ contacts, onChange, errors }) => {
  console.log(contacts, onChange, errors)
  let err = errors.map((e:string) => {
    return e.split('->')[1].replace(')', '').toLowerCase()
  })

  return (
    <div>
      {Object.keys(contacts).map((contact) =>
        <InputLow
          key={contact}
          title={contact}
          isError={err.some((e:string) => e === contact.toLowerCase())}
          name={`contacts.${contact}`}
          onChange={onChange}
          value={contacts[contact]}
          placeholder={contact}
        />
      )}
    </div>
  )
}

export default ProfileDescriptionForm