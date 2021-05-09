import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Formik, Form, useField, useFormikContext, Field, FieldArray } from "formik";
import * as Yup from "yup";
import MaskedInput from 'react-text-mask';
import FormButton from "components/common/FormButton/FormButton";
import s from './form.module.scss';
import cn from 'classnames';
import Positions from "./positions";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "store/registration-reducer";

const regexpEmail = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
const regexpPhone = /^[\+]{0,1}380([0-9]{9})$/;
const phoneNumberMask = [
    "+",
    "3",
    "8",
    "0",
    /[0-9]/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/
];

const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
        <div className={s.input_wrapper}>
            <label className={s.input_label} htmlFor={props.id || props.name}>{label}</label>
            <input className={meta.touched && meta.error ? cn(s.input_text, s.error) : s.input_text}
                autoComplete="off" {...field} {...props} />

            {meta.touched && meta.error ? (
                <div className={cn(s.input_assistive, s.error)}>{meta.error}</div>
            ) : (<div className={s.input_assistive}>{props.assistive}</div> || null)}
        </div>
    );
};

const MyPhoneInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
        <div className={s.input_wrapper}>
            <label className={s.input_label} htmlFor={props.id || props.name}>{label}</label>
            <Field name={props.name}
                render={({ field }) => (
                    <MaskedInput
                        className={meta.touched && meta.error ? cn(s.input_text, s.error) : s.input_text}
                        {...props}
                        {...field}
                        autoComplete="off"
                        guide={false}
                    // disabled="disabled"
                    />
                )}
            />

            {meta.touched && meta.error ? (
                <div className={cn(s.input_assistive, s.error)}>{meta.error}</div>
            ) : (<div className={s.input_assistive}>{props.assistive}</div> || null)}
        </div>
    );
};

const RegistrationForm = () => {

    const formError = useSelector((state) => state.registrationPage.serverError);
    const formSuccess = useSelector((state) => state.registrationPage.success);

    const dispatch = useDispatch();

    const FILE_SIZE = 5000 * 1024;
    const FILE_WIDTH = 70;
    const FILE_HEIGHT = 70;

    let [width, setWidth] = useState(null);
    let [height, setHeight] = useState(null);

    const SUPPORTED_FORMATS = [
        "image/jpg",
        "image/jpeg"
    ];

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, "Must be 2 characters or more")
            .max(15, "Must be 15 characters or less")
            .required("Error"),
        email: Yup.string()
            .min(2, "Invalid email address")
            .max(100, "Must be 100 characters or less")
            .required("Error")
            .matches(regexpEmail, 'Invalid email address'),
        phone: Yup.string()
            .required("Error")
            .matches(regexpPhone, 'Error'),
        position: Yup
            .mixed()
            .required("Select your position"),
        photo: Yup
            .mixed()
            .required("A file is required")
            .test(
                "fileFormat",
                "Unsupported Format. The photo format must be jpeg/jpg type.",
                value => value && SUPPORTED_FORMATS.includes(value.type)
            )
            .test(
                "fileSize",
                "File too large. The photo size must not be greater than 5 Mb",
                value => value && value.size <= FILE_SIZE
            )
            .test(
                "fileWidth",
                "Size of photo must be at least 70x70px.",
                value => value && width >= FILE_WIDTH
            )
            .test(
                "fileHeight",
                "Size of photo must be at least 70x70px.",
                value => value && height >= FILE_HEIGHT
            )
    });

    // debugger
    return (
        <>
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    phone: "",
                    position: "",
                    photo: undefined,
                }}

                validationSchema={validationSchema}

                onSubmit={(values, { resetForm }) => {
                    debugger

                    dispatch(registerUser(values));

                    resetForm();
        
                    // if (formSuccess === true) {
                    //     resetForm()
                    // }
                }}
            >

                {(formProps, values) => (
                    <Form className={s.main}>

                        <fieldset>
                            <MyTextInput
                                label="Name"
                                name="name"
                                type="text"
                                placeholder="Your name"
                            />
                            <MyTextInput
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="Your email"
                            />
                            <MyPhoneInput
                                label="Phone number"
                                name="phone"
                                type="tel"
                                placeholder="+380 XX XXX XX XX"
                                assistive="Enter phone number in open format"
                                mask={phoneNumberMask}
                            />
                        </fieldset>

                        <fieldset>
                            <p className={s.position_title}>Select your position</p>

                            <div role="group">
                                <Positions />

                                {formProps.touched.position && formProps.errors.position ? (
                                    <div className={cn(s.input_assistive, s.error)}>{formProps.errors.position}</div>
                                ) : (null)}

                            </div>

                        </fieldset>

                        <div className={s.file}>
                            <FieldArray name={`photo`}>
                                {(arrayHelper) => (
                                    <div className={s.file_wrapper}>
                                        <p className={s.file_title}>Photo</p>

                                        <input className={s.file_input} name="photo"
                                            id="photo" type="file"
                                            onChange={(event) => {
                                                let url = window.URL || window.webkitURL;
                                                formProps.setFieldValue("photo", event.currentTarget.files[0]);

                                                let file, img;
                                                if ((file = event.currentTarget.files[0])) {
                                                    img = new Image();
                                                    img.onload = function () {
                                                        // alert(this.width + " " + this.height);
                                                        setWidth(this.width);
                                                        setHeight(this.height);
                                                    };
                                                    img.src = url.createObjectURL(file);
                                                }

                                                formProps.setFieldTouched("photo", true, false);
                                            }}
                                        />

                                        <label className={formProps.touched.photo && formProps.errors.photo
                                            ? cn(s.input_text, s.error, s.file_field)
                                            : cn(s.input_text, s.file_field)}
                                            htmlFor="photo">

                                            <div className={s.file_field_fake}>
                                                {formProps.touched.photo && formProps.errors.photo
                                                    ? "No file chosen"
                                                    : "Upload your photo"}
                                            </div>

                                            {/* Button Photo */}
                                            <div className={formProps.touched.photo && formProps.errors.photo
                                                ? cn(s.file_field_button, s.error)
                                                : s.file_field_button
                                            }
                                            >
                                                Browse
                                            </div>

                                        </label>

                                        {formProps.touched.photo && formProps.errors.photo ? (
                                            <div className={cn(s.input_assistive, s.error)}>{formProps.errors.photo}</div>
                                        ) : (null)}

                                    </div>
                                )}

                            </FieldArray>
                        </div>

                        <div className={s.button_wrapper}>
                            <FormButton text="Sing up now" />
                        </div>

                        <div className={cn(s.input_assistive, s.error, s.form_error)}>
                            {formError}
                        </div>

                    </Form>
                )}

            </Formik>
        </>
    );
};

export default RegistrationForm;