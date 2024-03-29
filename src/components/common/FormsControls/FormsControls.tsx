import s from './FormsControls.module.css';
import { Input } from 'antd';
const { TextArea } = Input;

type InputPropsType = {
    name: string;
    placeholder: string;
    title?: string;
    value: any;
    htmlFor?: string;
    type?: string;
    touched?: any;
    errors?: any;
    isError?: any;
    onBlur?: any;
    onChange: any;
};
export const BaseInput: React.FC<InputPropsType> = (props) => {
    return (
        <div className={s.inputWrapper}>
            <label style={{ fontWeight: 'bold' }} htmlFor={props.htmlFor}>
                {props.title}
            </label>
            <br />
            <Input
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
    );
};

export const InputLow: React.FC<InputPropsType> = (props) => {
    return (
        <div>
            <label htmlFor={props.htmlFor} style={{ color: props.isError && 'red', fontWeight: 'bold' }}>
                {props.title}
            </label>
            <br />
            <Input
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
    );
};

type TextareaPropsType = {
    name: string;
    onBlur: any;
    onChange: any;
    placeholder: string;
    value: string;
};
export const Textarea: React.FC<TextareaPropsType> = (props) => {
    return (
        <div>
            <TextArea className={s.textarea} {...props} />
        </div>
    );
};
