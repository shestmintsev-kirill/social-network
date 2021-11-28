import { Formik } from "formik"
import * as Yup from "yup";
// import { authAPI } from "../../api/api";

const Login = (props) => {
  let authLogin = (values) => {
    const loginData = { ...values }
    for (let value in loginData) {
      if (value === 'confirmPassword') {
        delete loginData[value];
      }
    }
    console.log(loginData);
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginForm authLogin={authLogin} />
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
      .required("Пароль обязателен"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Пароли не совпадают')
      .required("Пароль обязателен")
  })

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
          remember: false
        }}
        validateOnBlur
        onSubmit={(values, { resetForm }) => {
          props.authLogin(values);
          resetForm();
        }}
        validationSchema={validationsSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
          <div>
            <div>
              <label htmlFor="email">Логин</label><br />
              <input
                type={'text'}
                placeholder={'Login'}
                name={'email'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {touched.email && errors.email && <p>{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password">Пароль</label><br />
              <input
                type={'password'}
                placeholder={'password'}
                name={'password'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {touched.password && errors.password && <p>{errors.password}</p>}
            </div>
            <div>
              <label htmlFor="confirmPassword">Подтвердите Пароль</label><br />
              <input
                type={'password'}
                placeholder={'confirmPassword'}
                name={'confirmPassword'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
              />
              {touched.confirmPassword && errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            </div>
            <div>
              <input
                value={values.remember}
                name={'remember'}
                onChange={handleChange}
                type={'checkbox'}
              /> remember me
            </div>
            <div>
              <button
                disabled={!isValid && !dirty}
                onClick={handleSubmit}
                type={'submit'}
              >
                Login
              </button>
            </div>
          </div>
        )}
      </Formik>
    </div>
  )
}

export default Login