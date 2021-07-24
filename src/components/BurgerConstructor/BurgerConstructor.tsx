import React from 'react';

import {
    Button,
    CurrencyIcon,
    ConstructorElement,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerConstructor.module.css';
import stylesScrollable from '../../css/scrollable.module.css';


import PropTypes from 'prop-types';

function BurgerConstructor(props: any) {

    const ingredientItems = Array.from(props.selectedIngredientsId)
        .map((v: any) => { return props.data.find((val: any) => { return val._id === v; }) });

    const bunList = ingredientItems
        .filter((v: any) => { return v.type === 'bun' })
        .filter((v, i, a) => { return a.indexOf(v) === i; });

    const ingredientList = ingredientItems
        .filter((v: any) => { return v.type !== 'bun' });

    const total = Array.from(ingredientItems)
        .map((v: any) => { return v.price })
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

    const removeIngredient = (id: string) => {
        props.removeIngredient(id);
    };

    const checkout = () => {

        const orderData = {
            orderNumber: Math.floor(Math.random() * 999999),
            selectedIngredientsId: props.selectedIngredientsId,
            total: total
        }

        props.completeCheckout(orderData);
    }

    return (
        <div className={styles['burger-constructor'] + ' pt-25 pl-4'}>

            <ul className={styles['top'] + " pr-4"}>
                {bunList.map((item: any, i) => (
                    <li key={`${item._id}_${i}`}>
                        {bunList.length > 1 ? <DragIcon type="primary" /> : null}
                        <ConstructorElement
                            type="top"
                            isLocked={bunList.length === 1}
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}
                            handleClose={() => removeIngredient(item._id)}
                        />
                    </li>
                ))}
            </ul>

            <ul className={stylesScrollable.scrollable + " pr-2 pt-4 pb-4"}>
                {ingredientList.map((item: any, i: any) => (

                    <li key={`${item._id}_${i}`}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            isLocked={false}
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}
                            handleClose={() => removeIngredient(item._id)}
                        />
                    </li>

                ))}

                {ingredientList.length === 0 ?
                    <li className="text text_type_main-default" style={{ justifyContent: 'center' }}>
                        Вы можете выбрать начинку или соус
                    </li>
                    : null}

            </ul>

            <ul className={styles.bottom + " pr-4"}>
                {bunList.map((item: any, i) => (
                    <li key={`${item._id}_${i}`}>
                        {bunList.length > 1 ? <DragIcon type="primary" /> : null}
                        <ConstructorElement
                            type="bottom"
                            isLocked={bunList.length === 1}
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}
                            handleClose={() => removeIngredient(item._id)}
                        />
                    </li>
                ))}
            </ul>

            {total > 0 ?
                <div className={styles["checkout-block"] + " mt-10 pr-4"}>
                    <div className={styles.total}>
                        <span className="text text_type_digits-medium">
                            {total}
                        </span>
                    </div>
                    <div className={styles["currency-icon-wrapper"] + " ml-2"}>
                        <CurrencyIcon type="primary" onClick={undefined} />
                    </div>
                    <div className={styles["button-wrapper"] + " ml-10"}>
                        <Button type="primary" size="large" onClick={checkout}>
                            Оформить заказ
                        </Button>
                    </div>
                </div>
                : null}

        </div>
    );
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number
    })),
    selectedIngredientsId: PropTypes.arrayOf(PropTypes.string),
    removeIngredient: PropTypes.func,
    completeCheckout: PropTypes.func,
};

export default BurgerConstructor;