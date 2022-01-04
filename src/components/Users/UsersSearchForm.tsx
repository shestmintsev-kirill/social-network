import { useFormik } from 'formik';
import { FilterType } from '../../redux/users-reducer';
import * as Yup from 'yup';
import React from 'react';
import { getUsersFilter } from '../../redux/users-selectors';
import { useSelector } from 'react-redux';

type PropsType = {
    onFilterChanged: (filter: FilterType) => void;
};

type FormType = {
    term: string;
    friend: 'true' | 'false' | 'null';
};

const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
    const filter = useSelector(getUsersFilter);

    const validationsSchema = Yup.object().shape({
        term: Yup.string()
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            term: filter.term,
            friend: String(filter.friend) as 'true' | 'false' | 'null'
        },
        onSubmit: (values: FormType) => {
            const filter: FilterType = {
                term: values.term,
                friend: values.friend === 'null' ? null : values.friend === 'false' ? false : true
            };
            props.onFilterChanged(filter);
        },
        validationSchema: validationsSchema
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <input
                    name={'term'}
                    onChange={formik.handleChange}
                    value={formik.values.term}
                    type={'text'}
                />
                <select name={'friend'} value={formik.values.friend} onChange={formik.handleChange}>
                    <option value="null">All</option>
                    <option value="true">Only followed</option>
                    <option value="false">Only unfollowed</option>
                </select>
            </div>
            <button disabled={!formik.isValid} type={'submit'}>
                Search
            </button>
        </form>
    );
});

export default UsersSearchForm;
