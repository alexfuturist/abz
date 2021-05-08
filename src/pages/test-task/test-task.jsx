import React from 'react';
import Acquaintance from './acquaintance/acquaintance';
import Header from './header/header';
import Registration from './registration/registration';
import Users from './users/users';
import Footer from './footer/footer';

const TestTask = () => {
    return (
        <div>
            <Header />
            <Acquaintance />
            <Users />
            <Registration />
            <Footer />
        </div>
    )
}

export default TestTask;