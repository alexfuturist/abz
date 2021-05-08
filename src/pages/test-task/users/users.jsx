import classNames from 'classnames';
import Button from 'components/common/Button/Button';
import React, { useEffect, useState } from 'react';
import User from './user/user';
import s from './users.module.scss'
import cn from 'classnames';
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from 'store/users-reducer';

const Users = () => {

    const dispatch = useDispatch();

    const [buttonEditMode, setButtonEditMode] = useState(true);

    //componentDidMount
    useEffect(() => {
        dispatch(getUsers())
    }, []);

    const nextPage = useSelector(state => state.usersPage.page) + 1;
    const totalPages = useSelector(state => state.usersPage.total_pages);
    const users = useSelector(state => state.usersPage.users.sort((a, b) => b.id > a.id ? 1 : -1));

    useEffect(() => {
        if (nextPage >= totalPages) {
            setButtonEditMode(false)
        } else {
            setButtonEditMode(true)
        }
    })
    // console.log(users);

    return (
        <section className={s.main}>
            <div className={cn("container", s.container)}>
                <h2 className={s.title}>Our cheerful users</h2>
                <p className={s.description}>Attention! Sorting users by registration date</p>
                <div className={s.users}>
                    {users.map(u =>
                        <div className={s.user} key={u.id} >
                            <User props={u}/>
                        </div>
                    )}
                </div>
                <div className={s.button}>
                    {buttonEditMode &&
                        <Button text="Show more" onClick={() => dispatch(getUsers(nextPage))} />
                    }
                </div>
            </div>
        </section>
    )
}

export default Users;