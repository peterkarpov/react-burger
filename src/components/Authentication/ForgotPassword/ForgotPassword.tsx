import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { SyntheticEvent } from "react";
import styles from './ForgotPassword.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from "../../../services/auth";
import { Redirect } from "react-router";
import { restorePassword } from "../../../services/actions/auth";
import { RootState } from "../../../utils/types";
import { useAppDispatch } from "../../../utils/hooks";

function ForgotPassword() {

    const auth = useAuth();
    const dispatch = useAppDispatch();

    const [email, setEmail] = React.useState('')
    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const history = useHistory();
    const { state } = useLocation<RootState>();

    const onLoginHandler = () => {
        history.replace({ pathname: '/login', state });
    }

    const onRestorePasswordkHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        
        (dispatch(restorePassword({ email })) as any)
            .then((data: { success: boolean }) => {
                if (data?.success) {
                    history.replace({ pathname: '/reset-password', state: { from: history.location } });
                }
            });
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
        <section style={{}} className={styles["forgot-password"] + " "}>

            <div className={styles.title + " text text_type_main-default"}>
                Восстановление пароля
            </div>

            <form className={styles.form + " pt-5 pb-20"} onSubmit={(e) => { onRestorePasswordkHandler(e) }}>

                <EmailInput onChange={onEmailChange} value={email} name={'E-mail'} />

                {email !== '' &&
                    <Button type="primary" size="medium">
                        Восстановить
                    </Button>
                }

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

export default ForgotPassword;
