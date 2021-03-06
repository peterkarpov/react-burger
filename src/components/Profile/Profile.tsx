import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from './../../services/auth';
import React, { useEffect } from "react";
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Profile.module.css';
import { updateUser, signOut } from '../../services/actions/auth';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/actions/wsActionTypes';
import ProfileOrders from '../ProfileOrders/ProfileOrders';
import { useAppDispatch } from '../../utils/hooks';

function Profile() {

    const { pathname, state } = useLocation();
    const auth = useAuth();
    const dispatch = useAppDispatch();

    const history = useHistory();

    useEffect(() => {

        dispatch({ type: WS_CONNECTION_START });

        return () => {

            dispatch({ type: WS_CONNECTION_CLOSED });

        }
    }, [dispatch]);

    const onProfileClickHandler = () => {
        history.replace({ pathname: '/profile', state });
    }

    const onOrdersClickHandler = () => {
        history.replace({ pathname: '/profile/orders', state });
    }

    const onLogoutClickHandler = () => {
        dispatch(signOut());
        history.replace({ pathname: '/login', state });
    }

    const [name, setName] = React.useState(auth.user?.name || '')
    const inputNameRef = React.useRef(null)

    const [email, setEmail] = React.useState(auth.user?.email || '')
    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const [password, setPassword] = React.useState('')

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const onSaveHandler = () => {
        dispatch(updateUser({ name, email, password }));
    }

    const onCancelHandler = () => {
        history.go(0);
    }

    return (
        <>
            <section className={`${styles.profile}`}>

                <div className={`${styles['left-aside']}`}>
                    <div
                        className={`${styles.link} text text_type_main-medium ${pathname !== '/profile' ? 'text_color_inactive' : null}`}
                        onClick={onProfileClickHandler}
                    >
                        ??????????????
                    </div>
                    <div
                        className={`${styles.link} text text_type_main-medium ${pathname !== '/profile/orders' ? 'text_color_inactive' : null}`}
                        onClick={onOrdersClickHandler}
                    >
                        ?????????????? ??????????????
                    </div>
                    <div
                        className={`${styles.link} text text_type_main-medium text_color_inactive`}
                        onClick={onLogoutClickHandler}
                    >
                        ??????????
                    </div>
                    <div className="text text_type_main-default text_color_inactive mt-20">
                        ?? ???????? ?????????????? ???? ???????????? ???????????????? ???????? ???????????????????????? ????????????
                    </div>
                </div>

                {pathname === '/profile' ?
                    <>
                        <div className={`${styles['right-aside']}`} style={{ alignItems: 'center', width: '60%' }}>

                            <Input
                                type={'text'}
                                placeholder={'??????'}
                                onChange={e => setName(e.target.value)}
                                value={name}
                                name={'name'}
                                error={false}
                                ref={inputNameRef}
                                errorText={'????????????'}
                                size={'default'}
                            />

                            <EmailInput onChange={onEmailChange} value={email} name={'??????????'} />

                            <PasswordInput onChange={onPasswordChange} value={password} name={'????????????'} />

                            {email !== '' && name !== '' && password !== '' &&
                                <>
                                    <Button type="primary" size="medium" onClick={onSaveHandler}>
                                        ??????????????????
                                    </Button>
                                    <Button type="primary" size="medium" onClick={onCancelHandler}>
                                        ????????????????
                                    </Button>
                                </>
                            }

                        </div>
                        <div style={{ width: '40%' }}></div>
                    </>
                    : null}

                {pathname === '/profile/orders' ?
                    <div className={`${styles['right-aside']}`}>

                        <ProfileOrders />

                    </div>
                    : null}

            </section>
        </>
    );
}

export default Profile;