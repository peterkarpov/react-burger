import loader from './../../images/loader.gif';

function Loader() {
    return (
        <>
            <style>{"\
          body{\
            overflow:hidden;\
          }\
        "}</style>

            <img
                style={{
                    width: '100%',
                    height: '100vh',
                    objectFit: 'contain',
                    backgroundColor: 'black',
                    overflow: 'hidden'
                }}
                alt={'loading...'}
                src={loader} />
        </>
    );
}

export default Loader;