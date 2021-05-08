import FormButton from 'components/common/FormButton/FormButton';
import React from 'react';
import cn from 'classnames';
import s from './modal.module.scss'
import { useSelector } from 'react-redux';

const RegistrationModal = () => {

    const editMode = useSelector((state) => state.registrationPage.success);

    const [modalActive, setModalActive] = React.useState(false);

    React.useEffect(() => {
        if (modalActive === true) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
    }, [modalActive]);

    React.useEffect(() => {
        setModalActive(editMode);
    }, [editMode]);

    const closeMenu = () => {
        setModalActive(false);
    }

    return (
        <div className={modalActive && s.active}>
            <div className={s.main}>
                <p className={s.title}>Congratulations</p>
                <button className={s.close} onClick={closeMenu}>X</button>
                <div className={s.description_wrapper}>
                    <p className={s.description}>You have successfully passed the registration</p>
                </div>
                <div className={s.button_wrapper}>
                    <FormButton text="Great" onClick={closeMenu}/>
                </div>
            </div>
            <div className={s.overlay}></div>
        </div>
    )
}

export default RegistrationModal;