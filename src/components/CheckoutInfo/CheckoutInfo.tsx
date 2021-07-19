import React from 'react';

import './CheckoutInfo.css';

import orderAccpeted from '../../images/order accpeted/popup/done.png';

class CheckoutInfo extends React.Component<{orderInfo: any}, {}> {

    render() {

        let orderNumber = this.props.orderInfo?.orderNumber;

        return (
            <div className="checkout-info">
                <div className="checkout-number text text_type_digits-large">
                    {orderNumber}
                </div>
                <div className="checkout-title text text_type_main-medium mt-8">
                    Идентификатор заказа
                </div>
                <div className="checkout-icon-wrapper mt-15 mb-15">
                    <img src={orderAccpeted} alt="" />
                </div>
                <div className="checkout-status text text_type_main-medium mb-2">
                    Ваш заказ начали готовить
                </div>
                <div className="checkout-text text text_type_main-medium text_color_inactive mb-15">
                    Дождитесь готовности на орбитальной станции
                </div>
            </div>
        )
    }

}

export default CheckoutInfo;