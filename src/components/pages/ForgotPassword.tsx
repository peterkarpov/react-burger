import ForgotPassword from "../Authentication/ForgotPassword/ForgotPassword";

export function ForgotPasswordPage() {

    const mainWrapperStyle = {
        display: 'flex',
        gap: 'calc(var(--offset-base-size) * 10)',
        justifyContent: 'space-evenly',

        width: 'calc(var(--offset-base-size) * 320)',
        marginLeft: 'auto',
        marginRight: 'auto'
    };

    return (
        <section className="main">
            <div className="wrapper" style={mainWrapperStyle}>

                <ForgotPassword></ForgotPassword>

            </div>
        </section>
    );
}

