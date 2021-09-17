import { PasswordInput, Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { SyntheticEvent } from "react";
import styles from './ResetPassword.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from "../../../services/auth";
import { Redirect } from "react-router";
import { resetPassword } from "../../../services/actions/auth";
import { LocationExtention, RootState } from "../../../utils/types";
import { useAppDispatch } from "../../../utils/hooks";

function ResetPassword() {

    const auth = useAuth();
    const dispatch = useAppDispatch();

    const [token, setToken] = React.useState('')
    const inputTokenRef = React.useRef(null)

    const [password, setPassword] = React.useState('')
    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const history = useHistory();
    const { state } = useLocation<RootState & LocationExtention>();

    const onLoginHandler = () => {
        history.replace({ pathname: '/login', state });
    }

    if (auth.isHasCookie()) {
        return (
            <Redirect
                to={{
                    pathname: '/'
                }}
            />
        );
    }

    if (state?.from?.pathname !== '/forgot-password') {
        return (
            <Redirect
                to={{
                    pathname: '/forgot-password'
                }}
            />
        );
    }

    const onResetClickHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        (dispatch(resetPassword({ token, password })) as any)
            .then((data: { success: boolean }) => {
                if (data.success) {
                    history.replace({ pathname: '/', state });
                }
            });
    }

    return (
        <section style={{}} className={styles["reset-password"] + " "}>

            <div className={styles.title + " text text_type_main-default"}>
                Восстановление пароля
            </div>

            <form className={styles.form + " pt-5 pb-20"} onSubmit={(e) => { onResetClickHandler(e) }}>

                <PasswordInput onChange={onPasswordChange} value={password} name={'Введите новый пароль'} />

                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setToken(e.target.value)}
                    value={token}
                    name={'token'}
                    error={false}
                    ref={inputTokenRef}
                    errorText={'Ошибка'}
                    size={'default'}
                />

                <Button type="primary" size="medium">
                    Восстановить
                </Button>

            </form>

            <div style={{ textAlign: "center" }} className={styles["title-bottom"] + "p-5 text text_type_main-default"}>
                Вспомнили пароль?
                <Button type="secondary" size="medium" onClick={onLoginHandler}>
                    Войти
                </Button>
            </div>

        </section>
    );
}

export default ResetPassword;
