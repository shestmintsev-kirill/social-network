import { useFormik } from 'formik';
import { ContactsType, ProfileType } from '../../../types/types';
import { BaseInput, InputLow } from '../../common/FormsControls/FormsControls';
import { Button, Checkbox } from 'antd';
import { updateProfile } from '../../../redux/profile-reducer';
import { useDispatch } from 'react-redux';

type ProfileDescriptionFormPropsType = {
    profile: ProfileType;
    authorizedUserId: number | null;
    errors: string[];
    closeEditMode: () => void;
};

type ProfileDescriptionFormValuesType = {
    fullName: string;
    aboutMe: string;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    contacts: ContactsType;
};

const ProfileDescriptionForm: React.FC<ProfileDescriptionFormPropsType> = ({
    closeEditMode,
    profile,
    authorizedUserId,
    errors
}) => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            fullName: profile.fullName,
            aboutMe: profile.aboutMe,
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            contacts: {
                facebook: profile.contacts.facebook,
                github: profile.contacts.github,
                instagram: profile.contacts.instagram,
                mainLink: profile.contacts.mainLink,
                twitter: profile.contacts.twitter,
                vk: profile.contacts.vk,
                website: profile.contacts.website,
                youtube: profile.contacts.youtube
            }
        },
        onSubmit: async (values: ProfileDescriptionFormValuesType) => {
            if (authorizedUserId) {
                await dispatch(updateProfile({ ...values, userId: authorizedUserId }));
                closeEditMode();
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <BaseInput
                title={'Имя'}
                name={'fullName'}
                onChange={formik.handleChange}
                value={formik.values.fullName}
                placeholder={'fullName'}
            />
            <BaseInput
                title={'Обо мне'}
                name={'aboutMe'}
                onChange={formik.handleChange}
                value={formik.values.aboutMe}
                placeholder={'aboutMe'}
            />
            <Checkbox
                onChange={formik.handleChange}
                checked={formik.values.lookingForAJob}
                name={'lookingForAJob'}
            >
                looking For A Job
            </Checkbox>
            {formik.values.lookingForAJob && (
                <BaseInput
                    title={'Описание для поиска работы'}
                    name={'lookingForAJobDescription'}
                    onChange={formik.handleChange}
                    value={formik.values.lookingForAJobDescription}
                    placeholder={'looking For A Job Description'}
                />
            )}
            <Contacts contacts={formik.values.contacts} onChange={formik.handleChange} errors={errors} />
            <div>
                <Button disabled={!formik.isValid} htmlType={'submit'}>
                    Save
                </Button>
            </div>
            {!!errors.length &&
                errors.map((err: string, index: number) => (
                    <div key={index} style={{ color: 'red' }}>
                        <strong>Ошибка: </strong>
                        {err}
                    </div>
                ))}
        </form>
    );
};

type ContactsPropsType = {
    contacts: any;
    onChange: any;
    errors: string[];
};

const Contacts: React.FC<ContactsPropsType> = ({ contacts, onChange, errors }) => {
    const err = errors.map((e: string) => {
        return e.split('->')[1]?.replace(')', '').toLowerCase();
    });

    return (
        <div>
            {Object.keys(contacts).map((contact) => (
                <InputLow
                    key={contact}
                    title={contact}
                    isError={err.some((e: string | null) => e === contact.toLowerCase())}
                    name={`contacts.${contact}`}
                    onChange={onChange}
                    value={contacts[contact]}
                    placeholder={contact}
                />
            ))}
        </div>
    );
};

export default ProfileDescriptionForm;
