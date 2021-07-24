import React from 'react';
import ReactDOM from 'react-dom';

import ModalOverlay from '../ModalOverlay/ModalOverlay';

import {
    CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './Modal.module.css';

class Modal extends React.Component<{ onCloseModalCallback: any, title: any }, { enable: boolean }> {

    constructor(props: any) {

        super(props);

        this.state = {
            enable: true,
        };

        this.closeModal = this.closeModal.bind(this);
    }

    closeModal = (e: any) => {

        e.stopPropagation();

        if (e.code === 'Escape' || e.currentTarget.className === e.target.className || `${e.currentTarget.className}`.includes(styles['close-icon-wrapper'])) {
            this.props.onCloseModalCallback();
            this.setState({ ...this.state, enable: false });
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.closeModal);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.closeModal);
    }

    render() {

        const modalRoot: any = document.getElementById("for-modal");

        return ReactDOM.createPortal(
            (
                <>
                    {this.state.enable ?
                        <ModalOverlay onClick={this.closeModal}>
                            <div className={`${styles["modal-body"]} pt-10 pl-10 pr-10 pb-15`}>
                                <div className={styles["modal-header"]}>
                                    <span className={styles['modal-title'] + " text text_type_main-large"}>
                                        {this.props.title}
                                    </span>
                                    <div className={styles["close-icon-wrapper"]} onClick={this.closeModal}>
                                        <CloseIcon type="primary" />
                                    </div>
                                </div>
                                {this.props.children}
                            </div>
                        </ModalOverlay>
                        : null}
                </>
            ),
            modalRoot
        )
    }

};

export default Modal;