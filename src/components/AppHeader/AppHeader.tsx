import React from 'react';

import {
    Logo,
    BurgerIcon,
    ProfileIcon,
    ListIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import './AppHeader.css';

function AppHeader() {
    return (
        <header className="app-header pt-4 pb-4">

            <div className="wrapper">

                <ul className="navigation-bar">
                    <li className="navigation-link p-5">
                        <BurgerIcon type="primary" />
                        <span className="text text_type_main-default ml-2" >Конструктор</span>
                    </li>
                    <li className="navigation-link p-5">
                        <ListIcon type="secondary" />
                        <span className="text text_type_main-default text_color_inactive ml-2" >Лента заказов</span>
                    </li>
                </ul>

                <div className="logo-wrapper">
                    <Logo />
                </div>

                <ul className="navigation-bar">
                    <li className="navigation-link p-5">
                        <ProfileIcon type="secondary" />
                        <span className="text text_type_main-default text_color_inactive ml-2" >Личный кабинет</span>
                    </li>
                </ul>

            </div>

        </header>
    );
}

export default AppHeader;