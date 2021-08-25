import AppHeader from "../AppHeader/AppHeader";
import ResetPassword from "../Authentication/ResetPassword/ResetPassword";

export function ResetPasswordPage() {

    const mainWrapperStyle = {
        display: 'flex',
        gap: 'calc(var(--offset-base-size) * 10)',
        justifyContent: 'space-evenly',

        width: 'calc(var(--offset-base-size) * 320)',
        marginLeft: 'auto',
        marginRight: 'auto'
    };

    return (

        <>
            <AppHeader />

            <section className="main">
                <div className="wrapper" style={mainWrapperStyle}>

                    <ResetPassword></ResetPassword>

                </div>
            </section>

        </>

    );
}

