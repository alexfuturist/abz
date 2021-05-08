import React from 'react';
import cn from 'classnames';
import HeaderMenu from 'components/header-menu/header-menu';
import s from './header.module.scss';
import Button from 'components/common/Button/Button'

import bgDesktop1x from 'assets/img/dist/header_bg_desktop_1x.jpg';
import bgDesktop2x from 'assets/img/dist/header_bg_desktop_2x.jpg';
import bgDesktopWebp1x from 'assets/img/dist/header_bg_desktop_1x.webp';
import bgDesktopWebp2x from 'assets/img/dist/header_bg_desktop_2x.webp';

import bgMobile1x from 'assets/img/dist/header_bg_mobile_1x.jpg';
import bgMobile2x from 'assets/img/dist/header_bg_mobile_2x.jpg';
import bgMobileWebp1x from 'assets/img/dist/header_bg_mobile_1x.webp';
import bgMobileWebp2x from 'assets/img/dist/header_bg_mobile_2x.webp';

const Header = () => {
    return (
        <header className={s.header}>
            <HeaderMenu />
            <div className={s.header_bg_wrapper}>
                <picture>
                    <source media="(min-width: 768px)" type="image/webp" srcSet={`${bgDesktopWebp1x} 1x, ${bgDesktopWebp2x} 2x`} />
                    <source media="(min-width: 768px)" type="image/jpg" srcSet={`${bgDesktop1x} 1x, ${bgDesktop2x} 2x`} />
                    <source type="image/webp" srcSet={`${bgMobileWebp1x} 1x, ${bgMobileWebp2x} 2x`} />
                    <source type="image/jpg" srcSet={`${bgMobile1x} 1x, ${bgMobile2x} 2x`} />
                    <img className={s.header_bg} src={bgMobile1x} alt="header-background" />
                </picture>
            </div>
            <div className="container">
                <div className={cn(s.header_content)}>
                    <h1 className={s.header_title}>Test assignment for Frontend Developer position</h1>
                    <p className={s.header_description_mobile}>We kindly remind you that your test assignment should be submitted as a link to github/bitbucket repository.</p>
                    <p className={s.header_description_tablet}>We kindly remind you that your test assignment should be submitted as a link to github/bitbucket repository. Please be patient, we consider and respond to every application that meets minimum requirements. We look forward to your submission. Good luck! The photo has to scale in the banner area on the different screens</p>
                    <div className={s.header_button}>
                        <Button href="#registration" text="Sing up now" />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;