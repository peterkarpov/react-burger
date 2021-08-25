import { PasswordInput, Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from './ResetPassword.module.css';
import { useHistory, useLocation } from 'react-router-dom';

function ResetPassword() {

    const [token, setToken] = React.useState('')
    const inputTokenRef = React.useRef(null)

    const [password, setPassword] = React.useState('')
    const onPasswordChange = (e: any) => {
        setPassword(e.target.value)
    }

    const history = useHistory();
    const { state } = useLocation();

    const onLoginHandler = () => {
        history.replace({ pathname: '/login', state });
    }

    return (
        <section style={{}} className={styles["forgot-password"] + " "}>

            <div className={styles.title + " text text_type_main-default"}>
                Восстановление пароля
            </div>

            <form className={styles.form + " pt-5 pb-20"} onSubmit={(e) => { e.preventDefault() }}>

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
