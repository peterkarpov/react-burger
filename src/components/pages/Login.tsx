import AppHeader from "../AppHeader/AppHeader";
import Login from "../Authentication/Login/Login";

export function LoginPage() {
    
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

                    <Login></Login>

                </div>
            </section>

        </>

    );
}

