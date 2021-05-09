import React, { useEffect, useState } from 'react';
import s from './form.module.scss';
import cn from 'classnames';
import { Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getPositions } from 'store/registration-reducer';

const Positions = React.memo(() => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPositions());
    }, [])

    const positions = useSelector(state => state.registrationPage.positions);

    return (
        <div>
            {/* Почему-то не срабатывет checked при таком способе..*/}
            {positions.map(u =>
                <div className={s.radio_item} key={u.id}>
                    <Field className={s.radio_input} type="radio" name="position" id={u.id} value={u.id} />
                    <label className={s.radio_label} htmlFor={u.id}>
                        {u.name}
                    </label>
                </div>
            )}

            <br />

            <div className={s.radio_item}>
                <Field className={s.radio_input} type="radio" name="position" id="1" value="1" />
                <label className={s.radio_label} htmlFor="1">
                    Lawyer
                                    </label>
            </div>

            <div className={s.radio_item}>
                <Field className={s.radio_input} type="radio" name="position" id="2" value="2" />
                <label className={s.radio_label} htmlFor="2">
                    Content manager
                                    </label>
            </div>

            <div className={s.radio_item}>
                <Field className={s.radio_input} type="radio" name="position" id="3" value="3" />
                <label className={s.radio_label} htmlFor="3">
                    Security
                                    </label>
            </div>

            <div className={s.radio_item}>
                <Field className={s.radio_input} type="radio" name="position" id="4" value="4" />
                <label className={s.radio_label} htmlFor="4">
                    Designer
                                    </label>
            </div>
        </div>
    )
});

export default Positions;