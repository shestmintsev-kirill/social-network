import { useFormik } from "formik"
import { connect } from "react-redux";
import { login } from '../../redux/auth-reducer'
import * as Yup from "yup";
import { Input } from "../common/FormsControls/FormsControls";
import { Redirect } from "react-router";

const Login = (props) => {
  if (props.isAuth) {
    return <Redirect to={'/profile'} />
  }

  let authLogin = (values) => {
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
      <LoginForm authLogin={authLogin} errorMessage={props.errorMessage} />
    </div>
  )
}

const LoginForm = (props) => {
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
      .required("Подтверждение пароля обязательно")
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false
    },
    onSubmit: (values, { resetForm }) => {
      props.authLogin(values);
      props.errorMessage && resetForm();
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
      <p style={{ color: 'red' }}>{props.errorMessage}</p>
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
          value={formik.values.rememberMe}
          name={'rememberMe'}
          onChange={formik.handleChange}
          type={'checkbox'}
        /> remember me
      </div>
      <div>
        <button
          disabled={!formik.isValid && !formik.dirty}
          type={'submit'}
        >
          Login
        </button>
      </div>
    </form >
  )
}

const mapStateToProps = (state) => ({ isAuth: state.auth.isAuth, errorMessage: state.auth.errorMessage })

export default connect(mapStateToProps, { login })(Login)