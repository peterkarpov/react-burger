import React from 'react';

import styles from './ModalOverlay.module.css';

// import PropTypes from 'prop-types';

function ModalOverlay(props: any) {

    return (
        <div className={styles["modal-background"]} onClick={props.onClick}>
            {props.children}
        </div>
    );
}

// ModalOverlay.propTypes = {
//     children: PropTypes.oneOfType([
//         PropTypes.arrayOf(PropTypes.node),
//         PropTypes.node
//     ]).isRequired,
//     onClick: PropTypes.func,
// };

export default ModalOverlay;