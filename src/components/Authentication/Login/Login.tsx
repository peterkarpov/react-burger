import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from './Login.module.css';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import { useAuth } from '../../../services/auth';
import { useCallback } from "react";
import { signIn } from "../../../services/actions/auth";
import { LocationExtention, RootState } from "../../../utils/types";
import { useAppDispatch } from "../../../utils/hooks";

function Login() {

    const auth = useAuth();
    const dispatch = useAppDispatch();

    //process.env.NODE_ENV !== 'production' // TODO
    
    const [email, setEmail] = React.useState('') //bisotow677@bushdown.com
    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const [password, setPassword] = React.useState('')  //123456
    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const history = useHistory();
    const { state } = useLocation<RootState & LocationExtention>();

    const onRegisterHandler = () => {
        history.replace({ pathname: '/register', state });
    }

    const onForgotPassword = () => {
        history.replace({ pathname: '/forgot-password', state });
    }

    const login = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(signIn({ email, password }));
        },
        [email, password, dispatch]
    );

    if (auth.isHasCookie()) {
        return (
            <Redirect
                to={{
                    pathname: state?.from?.pathname || '/'
                }}
            />
        );
    }

    return (
        <section style={{}} className={styles["login"] + " "}>

            <div className={styles.title + " text text_type_main-default"}>
                Вход
            </div>

            <form className={styles.form + " pt-5 pb-20"} onSubmit={(e) => { login(e) }}>

                <EmailInput onChange={onEmailChange} value={email} name={'E-mail'} />

                <PasswordInput onChange={onPasswordChange} value={password} name={'Пароль'} />

                {email !== '' && password !== '' &&
                    <Button type="primary" size="medium">
                        Войти
                    </Button>
                }
                
            </form>

            <div style={{ textAlign: "center" }} className={styles["title-bottom"] + " pt-4 text text_type_main-default"}>
                Вы новый пользователь?
                <Button type="secondary" size="medium" onClick={onRegisterHandler}>
                    Зарегистрироваться
                </Button>
            </div>

            <div style={{ textAlign: "center" }} className={styles["title-bottom"] + " pt-4 text text_type_main-default"}>
                Забыли пароль?
                <Button type="secondary" size="medium" onClick={onForgotPassword}>
                    Восстановить пароль
                </Button>
            </div>

        </section>
    );
}

export default Login;
