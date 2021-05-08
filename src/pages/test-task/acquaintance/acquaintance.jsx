import React from 'react';
import manLaptop from 'assets/img/dist/svg/man-laptop-v1.svg';
import s from './acquaintance.module.scss';

const Acquaintance = () => {
    return (
        <section className={s.main}>
            <div className="container">
                <h2 className={s.title}>Let's get acquainted</h2>
                <div className={s.content}>
                    <div className={s.image_wrapper}>
                        <img src={manLaptop} alt="manLaptop" width="289" height="243" />
                    </div>
                    <div>
                        <p className={s.description}>I am cool frontend developer</p>
                        <p className={s.text}>
                            We will evaluate how clean your approach to writing CSS and Javascript code is. You can use any CSS and Javascript 3rd party libraries without any restriction.
                            <br /><br />
                            If 3rd party css/javascript libraries are added to the project via bower/npm/yarn you will get bonus points. If you use any task runner (gulp/webpack) you will get bonus points as well. Slice service directory page P​SD mockup​ into HTML5/CSS3.
                        </p>
                        <div className={s.link_wrapper}>
                            <a className={s.link} href="#registration">Sing up now</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Acquaintance;