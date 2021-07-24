import React from 'react';

import styles from './ModalOverlay.module.css';

function ModalOverlay(props: any) {

    const modalBackgroundRef = React.useRef(null);

    React.useEffect(() => {

        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
        }

    })

    const onKeyDown = (e: any) => {

        if (e.code === 'Escape') {
            props.onClick(e);
        }

    }

    return (
        <>
            <div className={styles["modal-background"]} ref={modalBackgroundRef} tabIndex={0} onKeyDown={onKeyDown} onClick={props.onClick}>
                {props.children}
            </div>
        </>
    );
}

export default ModalOverlay;