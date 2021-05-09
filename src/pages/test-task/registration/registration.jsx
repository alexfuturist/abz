import React, { useEffect } from 'react';
import ScrollableAnchor from 'react-scrollable-anchor';
import RegistrationForm from './form/form';
import s from './registration.module.scss'
import { getToken } from 'store/registration-reducer';
import { useDispatch } from 'react-redux';
import RegistrationModal from './modal/modal';

const Registration = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getToken());
    }, [])

    return (
        <ScrollableAnchor id={'registration'} >
            <section className={s.main}>
                <div className="container">
                    <h2 className={s.title}>Register to get a work</h2>
                    <p className={s.description}>Attention! After successful registration and alert, update the list of users in the block from the top</p>
                    <div className={s.form_wrapper}>
                        <RegistrationForm />
                    </div>
                </div>
                <RegistrationModal />
            </section>
        </ScrollableAnchor>
    )
}

export default Registration;