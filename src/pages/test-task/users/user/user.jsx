import React, { useEffect, useRef, useState } from 'react';
import s from './user.module.scss'
import photoDefault from 'assets/img/dist/photo-cover.png';
import { useMeasure } from 'react-use';

const User = ({ props }) => {

    const [editMode, setEditMode] = useState(false);

    const [email, { x, y, width, height, top, right, bottom, left }] = useMeasure();

    useEffect(() => {
        if (width > 216) {
            setEditMode(true);
        }
    })

    return (
        <div className={s.wrapper}>
            <div className={s.photo}>
                <img src={props.photo || photoDefault} alt="photo" width="70" height="70" />
            </div>
            <h3 className={s.user_name}>
                {props.name}
            </h3>
            <p className={s.position}>{props.position}</p>
            <div className={s.email_wrapper}>
                <a
                    className={s.email}
                    href={`mailto:${props.email || "commoncommoncommon@gmail.com"}`
                    }>
                    <div className={s.email_text}>
                        {`${props.email || "23132132113213213gmail.com"}`}
                    </div>
                    <div className={s.email_text_phantom} ref={email}>
                        {`${props.email || "23132132113213213gmail.com"}`}
                    </div>
                </a>
                {editMode &&
                    <div className={s.email_tooltip}>{`${props.email || "commoncommoncommon@gmail.com"}`}</div>
                }
            </div>
            <a className={s.phone} href={`tel:${props.phone}`}>
                {props.phone}
            </a>

        </div >
    )
}

export default User;