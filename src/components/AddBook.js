import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddBook = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/categories').then(response => {
            setCategories(response.data);
        });
    }, []);

    const initialValues = {
        id: '',
        title: '',
        description: '',
        category: '',
        price: '',
        quantity: '',
        entryDate: ''
    };

    const validationSchema = Yup.object({
        id: Yup.string().matches(/^BO-\d{4}$/, 'Mã sản phẩm không đúng định dạng').required(),
        title: Yup.string().required('Tên sản phẩm là bắt buộc'),
        description: Yup.string().required(),
        category: Yup.string().required(),
        price: Yup.number().positive().required(),
        quantity: Yup.number().integer().positive().required(),
        entryDate: Yup.date().max(new Date(), 'Ngày nhập không được lớn hơn ngày hiện tại').required()
    });

    const onSubmit = (values, { resetForm }) => {
        axios.post('http://localhost:3001/books', values)
            .then(() => {
                alert('Thêm sản phẩm thành công!');
                resetForm();
            });
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form>
                <div className="row mb-3 col-md-6">
                    <label>Mã sách</label>
                    <Field name="id" />
                    <ErrorMessage name="id" />
                </div>
                <div className="row mb-3 col-md-6">
                    <label>Tên sách</label>
                    <Field name="title" />
                    <ErrorMessage name="title" />
                </div>
                <div className="row mb-3 col-md-6">
                    <label>Mô tả</label>
                    <Field name="description" />
                    <ErrorMessage name="description" />
                </div>
                <div className="row mb-3 col-md-6">
                    <label>Thể loại</label>
                    <Field as="select" name="category">
                        <option value="">Chọn thể loại</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </Field>
                    <ErrorMessage name="category" />
                </div>
                <div className="row mb-3 col-md-6">
                    <label>Giá</label>
                    <Field name="price" />
                    <ErrorMessage name="price" />
                </div>
                <div className="row mb-3 col-md-6">
                    <label>Số lượng</label>
                    <Field name="quantity" />
                    <ErrorMessage name="quantity" />
                </div>
                <div className="row mb-3 col-md-6">
                    <label>Ngày nhập</label>
                    <Field name="entryDate" type="date" />
                    <ErrorMessage name="entryDate" />
                </div>
                <button type="submit">Thêm sản phẩm</button>
            </Form>
        </Formik>
    );
};

export default AddBook;
