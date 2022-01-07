import { useFormik } from 'formik';
import { FilterType } from '../../redux/users-reducer';
import * as Yup from 'yup';
import React from 'react';
import { getUsersFilter } from '../../redux/users-selectors';
import { useSelector } from 'react-redux';
import { Button, Select, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

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
        <form onSubmit={formik.handleSubmit} style={{ marginBottom: 10 }}>
            <Input
                name={'term'}
                style={{ width: 230 }}
                onChange={formik.handleChange}
                value={formik.values.term}
                type={'text'}
            />
            <Select
                value={formik.values.friend}
                style={{ width: 130 }}
                onChange={(value) => {
                    formik.setFieldValue('friend', value);
                }}
                onSelect={formik.handleChange}
            >
                <Option value="null">All</Option>
                <Option value="true">Only followed</Option>
                <Option value="false">Only unfollowed</Option>
            </Select>
            <Button style={{ marginLeft: 30 }} disabled={!formik.isValid} htmlType="submit">
                <SearchOutlined />
            </Button>
        </form>
    );
});

export default UsersSearchForm;
