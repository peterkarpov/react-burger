import { useHistory, useLocation } from 'react-router-dom';
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

    const history = useHistory();
    const { state, pathname } = useLocation();
    
    const onConstructorClickHandler = () => {
        history.replace({ pathname: '/', state });
    }
    
    const onFeedClickHandler = () => {
        history.replace({ pathname: '/feed', state });
    }
    
    const onProfileClickHandler = () => {
        history.replace({ pathname: '/profile', state });
    }

    return (
        <header className={styles["app-header"] + " pt-4 pb-4"}>

            <div className={styles["wrapper"]} style={styleForHeaderWrapper}>

                <ul className={styles["navigation-bar"]}>
                    <li className={styles["navigation-link"] + " p-5"} onClick={onConstructorClickHandler}>
                        <BurgerIcon type={`${pathname === '/' ? 'primary' : 'secondary'}`} />
                        <span className={styles["navigation-text"] + ` text text_type_main-default ${pathname !== '/' ? 'text_color_inactive' : null} ml-2`} >Конструктор</span>
                    </li>
                    <li className={styles["navigation-link"] + " p-5"} onClick={onFeedClickHandler}>
                        <ListIcon type={`${pathname === '/feed' ? 'primary' : 'secondary'}`} />
                        <span className={styles["navigation-text"] + ` text text_type_main-default ${pathname !== '/feed' ? 'text_color_inactive' : null}  ml-2`} >Лента заказов</span>
                    </li>
                </ul>

                <div className={styles["logo-wrapper"]}>
                    <Logo />
                </div>

                <ul className={styles["navigation-bar"]}>
                    <li className={styles["navigation-link"] + " p-5"} onClick={onProfileClickHandler}>
                        <ProfileIcon type={`${pathname === '/profile' ? 'primary' : 'secondary'}`} />
                        <span className={styles["navigation-text"] + ` text text_type_main-default ${pathname !== '/profile' ? 'text_color_inactive' : null} ml-2`} >Личный кабинет</span>
                    </li>
                </ul>

            </div>

        </header>
    );
}

export default AppHeader;