import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from './../../services/auth';
import React from "react";
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Profile.module.css';

function Profile() {

    const { pathname, state } = useLocation();
    const auth = useAuth();

    const history = useHistory();

    const onProfileClickHandler = () => {
        history.replace({ pathname: '/profile', state });
    }

    const onOrdersClickHandler = () => {
        history.replace({ pathname: '/profile/orders', state });
    }

    const onLogoutClickHandler = () => {
        auth.signOut();
        history.replace({ pathname: '/login', state });
    }

    const [name, setName] = React.useState(auth.user?.name || '')
    const inputNameRef = React.useRef(null)

    const [email, setEmail] = React.useState(auth.user?.email || '')
    const onEmailChange = (e: any) => {
        setEmail(e.target.value)
    }

    const [password, setPassword] = React.useState('')
    const onPasswordChange = (e: any) => {
        setPassword(e.target.value)
    }

    const onSaveHandler = () => {
        auth.updateUser({ name, email, password })
            .then((data: any) => {

            });
    }

    return (
        <>
            <section className={`${styles.profile}`}>

                <div className={`${styles['left-aside']}`}>
                    <div
                        className={`${styles.link} text text_type_main-medium ${pathname !== '/profile' ? 'text_color_inactive' : null}`}
                        onClick={onProfileClickHandler}
                    >
                        Профиль
                    </div>
                    <div
                        className={`${styles.link} text text_type_main-medium ${pathname !== '/profile/orders' ? 'text_color_inactive' : null}`}
                        onClick={onOrdersClickHandler}
                    >
                        История заказов
                    </div>
                    <div
                        className={`${styles.link} text text_type_main-medium text_color_inactive`}
                        onClick={onLogoutClickHandler}
                    >
                        Выход
                    </div>
                    <div className="text text_type_main-default text_color_inactive mt-20">
                        В этом разделе вы можете изменить свои персональные данные
                    </div>
                </div>

                {pathname === '/profile' ?
                    <div className={`${styles['right-aside']}`}>

                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={e => setName(e.target.value)}
                            value={name}
                            name={'name'}
                            error={false}
                            ref={inputNameRef}
                            errorText={'Ошибка'}
                            size={'default'}
                        />

                        <EmailInput onChange={onEmailChange} value={email} name={'Логин'} />

                        <PasswordInput onChange={onPasswordChange} value={password} name={'Пароль'} />

                        {email !== '' && name !== '' && password !== '' &&
                            <Button type="primary" size="medium" onClick={onSaveHandler}>
                                Сохранить
                            </Button>
                        }
                        
                    </div>
                    : null}

                {pathname === '/profile/orders' ?
                    <div className={`${styles['right-aside']}`}>

                        its profile orders

                    </div>
                    : null}



            </section>
        </>
    );
}

export default Profile