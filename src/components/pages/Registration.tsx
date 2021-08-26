import Registration from "../Authentication/Registration/Registration";

export function RegistrationPage() {

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

                <Registration></Registration>

            </div>
        </section>
    );
}

