import React from 'react';

import {
    CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import './Modal.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

class Modal extends React.Component<{ onCloseModalCallback: any, title: any }, { enable: boolean }> {

    constructor(props: any) {

        super(props);

        this.state = {
            enable: true,
        };

        this.closeModal = this.closeModal.bind(this);
    }

    closeModal = (e: any) => {

        console.log(e);
        console.log(e.target);
        console.log(e.currentTarget);

        if (`${e.target.className}`.includes('modal-background') || `${e.currentTarget.className}`.includes('close-icon-wrapper')) {
            this.props.onCloseModalCallback();
            this.setState({ ...this.state, enable: false });
        }

        e.stopPropagation();
    }

    render() {
        return (
            <>
                {this.state.enable ?
                    <ModalOverlay onClick={this.closeModal}>
                        <div className="modal-body pt-10 pl-10 pr-10 pb-15">
                            <div className="modal-header">
                                <span className="modal-title text text_type_main-large">
                                    {this.props.title}
                                </span>
                                <div className="close-icon-wrapper" onClick={this.closeModal}>
                                    <CloseIcon type="primary" />
                                </div>
                            </div>
                            {this.props.children}
                        </div>
                    </ModalOverlay>
                    : null}
            </>
        )
    }


};

export default Modal;