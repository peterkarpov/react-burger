import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { SyntheticEvent } from "react";
import styles from './Registration.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from "../../../services/auth";
import { Redirect } from "react-router";
import { signUp } from "../../../services/actions/auth";
import { useAppDispatch } from "../../../utils/hooks";

function Registration() {

    const auth = useAuth();
    const dispatch = useAppDispatch();

    const [name, setName] = React.useState('')
    const inputNameRef = React.useRef(null)

    const [email, setEmail] = React.useState('')
    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const [password, setPassword] = React.useState('')
    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const history = useHistory();
    const { state } = useLocation();

    const onLoginHandler = () => {
        history.replace({ pathname: '/login', state });
    }

    const onRegistrationHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(signUp({ name, password, email }));
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

    return (
        <section style={{}} className={styles.registration + " "}>

            <div className={styles.title + " text text_type_main-default"}>
                Регистрация
            </div>

            <form className={styles.form + " pt-5 pb-20"} onSubmit={(e) => { onRegistrationHandler(e) }}>

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

                <EmailInput onChange={onEmailChange} value={email} name={'E-mail'} />

                <PasswordInput onChange={onPasswordChange} value={password} name={'Пароль'} />

                <Button type="primary" size="medium">
                    Зарегистрироваться
                </Button>

            </form>

            <div style={{ textAlign: "center" }} className={styles["title-bottom"] + "p-5 text text_type_main-default"}>
                Уже зарегистрированы?
                <Button type="secondary" size="medium" onClick={onLoginHandler}>
                    Войти
                </Button>
            </div>

        </section>
    );
}

export default Registration;
