import React from 'react';

import styles from './ModalOverlay.module.css';

function ModalOverlay(props: any) {

    return (
            <div className={styles["modal-background"]} onClick={props.onClick}>
                {props.children}
            </div>
    );
}

export default ModalOverlay;