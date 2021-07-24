import React from 'react';

import {
    Logo,
    BurgerIcon,
    ProfileIcon,
    ListIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './AppHeader.module.css';

const styleForHeaderWrapper = {
    width: 'calc(var(--offset-base-size) * 320)',
    marginLeft: 'auto',
    marginRight: 'auto'
}

function AppHeader() {

    return (
        <header className={styles["app-header"] + " pt-4 pb-4"}>

            <div className={styles["wrapper"]} style={styleForHeaderWrapper}>

                <ul className={styles["navigation-bar"]}>
                    <li className={styles["navigation-link"] + " p-5"}>
                        <BurgerIcon type="primary" />
                        <span className={styles["navigation-text"] + " text text_type_main-default ml-2"} >Конструктор</span>
                    </li>
                    <li className={styles["navigation-link"] + " p-5"}>
                        <ListIcon type="secondary" />
                        <span className={styles["navigation-text"] + " text text_type_main-default text_color_inactive ml-2"} >Лента заказов</span>
                    </li>
                </ul>

                <div className={styles["logo-wrapper"]}>
                    <Logo />
                </div>

                <ul className={styles["navigation-bar"]}>
                    <li className={styles["navigation-link"] + " p-5"}>
                        <ProfileIcon type="secondary" />
                        <span className={styles["navigation-text"] + " text text_type_main-default text_color_inactive ml-2"} >Личный кабинет</span>
                    </li>
                </ul>

            </div>

        </header>
    );
}

export default AppHeader;