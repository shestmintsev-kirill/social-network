import { useFormik } from "formik"
import { Input, InputLow } from "../../common/FormsControls/FormsControls"

const ProfileDescriptionForm = ({ profile, closeEditMode, updateProfile, authorizedUserId, errors }) => {

  const examValue = (value) => {
    return value ? value : '';
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
    onSubmit: async (values) => {
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
      {!!errors.length && errors.map((err, index) => <div key={index} style={{ color: 'red' }}><strong>Ошибка: </strong>{err}</div>)}
    </form>
  )
}

const Contacts = ({ contacts, onChange, errors }) => {
  let err = errors.map(e => {
    return e.split('->')[1].replace(')', '').toLowerCase()
  })

  return (
    <div>
      {Object.keys(contacts).map((contact) =>
        <InputLow
          key={contact}
          title={contact}
          isError={err.some(e => e === contact.toLowerCase())}
          name={`contacts.${contact}`}
          onChange={onChange}
          value={contacts[`${contact}`]}
          placeholder={contact}
        />
      )}
    </div>
  )
}

export default ProfileDescriptionForm