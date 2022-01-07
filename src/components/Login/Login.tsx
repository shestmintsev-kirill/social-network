import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import * as Yup from 'yup';
import { BaseInput } from '../common/FormsControls/FormsControls';
import { Redirect } from 'react-router';
import { AppStateType } from '../../redux/redux-store';
import { Button } from 'antd';

const Login: React.FC = () => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    const dispatch = useDispatch();

    if (isAuth) {
        return <Redirect to={'/profile'} />;
    }

    const authLogin = (values: LoginValuesType) => {
        const loginData = { ...values };
        for (const value in loginData) {
            if (value === 'confirmPassword') delete loginData[value];
        }
        dispatch(login(loginData));
    };

    return (
        <div>
            <h1>Login</h1>
            <LoginForm authLogin={authLogin} />
        </div>
    );
};

export interface LoginValuesType {
    email: string;
    password: string;
    confirmPassword?: string;
    captcha: string;
    rememberMe: boolean;
}

type LoginFormPropsType = {
    authLogin: (values: LoginValuesType) => void;
};
const LoginForm: React.FC<LoginFormPropsType> = ({ authLogin }) => {
    const captcha = useSelector((state: AppStateType) => state.auth.captcha);
    const errorMessage = useSelector((state: AppStateType) => state.auth.errorMessage);

    const validationsSchema = Yup.object<Record<keyof LoginValuesType, Yup.AnySchema>>().shape({
        email: Yup.string().email('Не валидный email').required('Логин обязателен'),
        password: Yup.string()
            .typeError('Должно быть строкой')
            .max(15, 'Must be 15 characters or less')
            .required('Пароль обязателен'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Пароли не совпадают')
            .required('Подтверждение пароля обязательно'),
        //@ts-ignore
        captcha: captcha && Yup.string().required('Поле обязательно')
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            captcha: '',
            rememberMe: false
        },
        onSubmit: (values: any, { resetForm }) => {
            authLogin(values);
            values.captcha = '';
            // errorMessage && resetForm();
        },
        validationSchema: validationsSchema
    });

    const loginInputs = [
        { name: 'email', title: 'Логин', placeholder: 'Login', type: 'text' },
        { name: 'password', title: 'Пароль', placeholder: 'Password', type: 'password' },
        {
            name: 'confirmPassword',
            title: 'Подтвердите Пароль',
            placeholder: 'Confirm password',
            type: 'password'
        }
    ];

    return (
        <form onSubmit={formik.handleSubmit}>
            {loginInputs.map((input, index) => (
                <BaseInput
                    key={index}
                    title={input.title}
                    type={input.type}
                    placeholder={input.placeholder}
                    name={input.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[input.name]}
                    touched={formik.touched[input.name]}
                    errors={formik.errors[input.name]}
                />
            ))}
            <div>
                <input
                    checked={formik.values.rememberMe}
                    name={'rememberMe'}
                    onChange={formik.handleChange}
                    type={'checkbox'}
                />{' '}
                remember me
            </div>
            {captcha && (
                <div>
                    <img src={captcha} alt="captcha" />
                    <BaseInput
                        type="text"
                        name={'captcha'}
                        value={formik.values.captcha}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        placeholder={'input captcha'}
                    />
                </div>
            )}
            <div>
                <p style={{ color: 'red' }}>{errorMessage}</p>
                <Button disabled={!formik.dirty || !formik.isValid} htmlType="submit">
                    Login
                </Button>
            </div>
        </form>
    );
};

export default Login;
