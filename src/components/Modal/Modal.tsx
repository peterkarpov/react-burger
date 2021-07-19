import React from 'react';

import {
    CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import './Modal.css';

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
        this.props.onCloseModalCallback();
        this.setState({ ...this.state, enable: false });
    }

    render() {
        return (
            <>
                {this.state.enable ?
                    <div className="modal-background" onClick={this.closeModal}>
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
                    </div>
                    : null}
            </>
        )
    }


};

export default Modal;