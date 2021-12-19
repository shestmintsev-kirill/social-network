import { useFormik } from "formik"
import { connect } from "react-redux";
import { login } from '../../redux/auth-reducer'
import * as Yup from "yup";
import { Input } from "../common/FormsControls/FormsControls";
import { Redirect } from "react-router";
import { AppStateType } from "../../redux/redux-store";

type MapStateLoginPropsType = {
  captcha: string | null
  errorMessage: string | null
  isAuth: boolean
}

type LoginDataType = {
  email: string,
  password: string,
  captcha: string,
  rememberMe: boolean
}
type MapDispatchLoginPropsType = {
  login: (loginData:LoginDataType) => void
}

type OwnPropsType = {} //standart props

type LoginPropsType = MapStateLoginPropsType & MapDispatchLoginPropsType & OwnPropsType

const Login:React.FC<LoginPropsType> = (props) => {
  if (props.isAuth) {
    return <Redirect to={'/profile'} />
  }

  let authLogin = (values:LoginValuesType) => {
    const loginData = { ...values }
    for (let value in loginData) {
      if (value === 'confirmPassword') {
        delete loginData[value];
      }
    }
    props.login(loginData);
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginForm authLogin={authLogin} errorMessage={props.errorMessage} captcha={props.captcha} />
    </div>
  )
}

export interface LoginValuesType {
  email: string,
  password: string,
  confirmPassword?: string,
  captcha: string,
  rememberMe: boolean
}


type LoginFormPropsType = {
  errorMessage: string | null,
  captcha: string | null,
  authLogin: (values: LoginValuesType) => void
}
const LoginForm:React.FC<LoginFormPropsType> = (props:any) => {
  const validationsSchema = Yup.object().shape({
    email: Yup.string()
      .email("Не валидный email")
      .required("Логин обязателен"),
    password: Yup.string()
      .typeError("Должно быть строкой")
      .max(15, 'Must be 15 characters or less')
      .required("Пароль обязателен"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Пароли не совпадают')
      .required("Подтверждение пароля обязательно"),
    captcha: props.captcha && Yup.string()
      .required("Поле обязательно")
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      captcha: '',
      rememberMe: false
    },
    onSubmit: (values:any, { resetForm }) => {
      props.authLogin(values);
      values.captcha = ''
      // props.errorMessage && resetForm();
    },
    validationSchema: validationsSchema
  })

  let loginInputs = [
    { name: 'email', title: 'Логин', placeholder: 'Login', type: 'text' },
    { name: 'password', title: 'Пароль', placeholder: 'Password', type: 'password' },
    { name: 'confirmPassword', title: 'Подтвердите Пароль', placeholder: 'Confirm password', type: 'password' }
  ]

  return (
    <form onSubmit={formik.handleSubmit}>
      {
        loginInputs.map((input, index) => <Input
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
        />)
      }
      <div>
        <input
          checked={formik.values.rememberMe}
          name={'rememberMe'}
          onChange={formik.handleChange}
          type={'checkbox'}
        /> remember me
      </div>
      {props.captcha && <div>
        <img src={props.captcha} alt="captcha" />
        <Input
          type="text"
          name={'captcha'}
          value={formik.values.captcha}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder={'input captcha'}
        />
      </div>}
      <div>
        <p style={{ color: 'red' }}>{props.errorMessage}</p>
        <button
          disabled={!formik.dirty || !formik.isValid}
          type={'submit'}
        >
          Login
        </button>
      </div>
    </form >
  )
}

const mapStateToProps = (state:AppStateType) => ({ isAuth: state.auth.isAuth, errorMessage: state.auth.errorMessage, captcha: state.auth.captcha })

export default connect<MapStateLoginPropsType, MapDispatchLoginPropsType, OwnPropsType, AppStateType>(mapStateToProps, { login })(Login)