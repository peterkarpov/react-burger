import { Link } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
import page404 from './../../images/page404v2.gif';

function Page404() {
    return (
        <>
            <AppHeader />

            <style>{"\
        body{\
          overflow:hidden;\
        }\
      "}</style>

            <Link to="/">
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: '100vh',
                    backgroundColor: 'black',
                    // alignItems: 'center'
                }}>
                    <img
                        title="Вернуться на главную"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '60vh',
                            objectFit: 'cover',
                            backgroundColor: 'black',
                            overflow: 'hidden'
                        }}
                        alt={'loading...'}
                        src={page404} />
                </div>
            </Link>
        </>
    );
}

export default Page404;