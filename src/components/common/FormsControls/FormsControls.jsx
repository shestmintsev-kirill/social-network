import s from './FormsControls.module.css'

export const Input = (props) => {
  return (
    <div className={s.inputWrapper}>
      <label htmlFor={props.htmlFor}>{props.title}</label><br />
      <input
        className={`${s.input} ${props.touched && props.errors && s.inputError}`}
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />
      {props.touched && props.errors && <p className={s.error}>{props.errors}</p>}
    </div>
  )
}

export const InputLow = (props) => {
  return (
    <div className={s.inputWrapperLow}>
      <label htmlFor={props.htmlFor} style={{ color: props.isError && 'red' }}>{props.title}</label><br />
      <input
        className={`${s.input} ${props.isError && s.inputError}`}
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />
      {props.touched && props.errors && <p className={s.error}>{props.errors}</p>}
    </div>
  )
}

export const Textarea = (props) => {
  return (
    <div>
      <textarea className={s.textarea} {...props} />
    </div>
  )
}