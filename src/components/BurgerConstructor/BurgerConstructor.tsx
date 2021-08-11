import React, { useReducer } from 'react';

import {
    Button,
    CurrencyIcon,
    ConstructorElement,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerConstructor.module.css';
import stylesScrollable from '../../css/scrollable.module.css';

import { useEffect } from 'react';

import { SET_SELECTED_INGREDIENTS } from '../../services/actions/basic';

import IDataItem from '../../utils/Interfaces/IDataItem';

//import { BurgerConstructorContext } from '../../services/BurgerConstructorContext';
//import { IBurgerConstructorContext } from '../../utils/Interfaces/IBurgerConstructorContext';

import { useDispatch, useSelector } from 'react-redux';

import DraggableElement from './DraggableElement';

import { useDrop } from "react-dnd";

function BurgerConstructor(props: { removeIngredient: (id: string) => void, data: IDataItem[], addIngredient: (id: string) => void, completeCheckout: (orderData: { orderNumber: (number | null), selectedIngredientsId: string[], total: number }) => void }) {

    //const { selectedIngredientsId, removeIngredient } = React.useContext<IBurgerConstructorContext>(BurgerConstructorContext);
    const { selectedIngredientsId } = useSelector<any, any>(state => state.basic);

    const dispatch = useDispatch();

    const ingredientItems = Array.from(selectedIngredientsId)
        .map((v: any) => {
            return props.data.find((val: IDataItem) => { return val._id === v; })
        });

    const bunList = ingredientItems
        .filter((v: (IDataItem | undefined)) => { return v?.type === 'bun' })
        .filter((v: (IDataItem | undefined), i: number, a: (IDataItem | undefined)[]) => { return a.indexOf(v) === i; });

    const ingredientList = ingredientItems
        .filter((v: any) => { return v.type !== 'bun' });

    const [total, dispatchTotal] = useReducer(((state: number) => {

        return Array.from(ingredientItems)
            .map((v: (IDataItem | undefined)) => { return v!.price })
            .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    }), 0);

    useEffect(() => {

        dispatchTotal();

    }, [selectedIngredientsId]);

    const removeIngredientHandler = (id: string) => {

        dispatchTotal();

        props.removeIngredient(id);

    };

    const checkout = () => {

        const orderData = {
            orderNumber: null,//Math.floor(Math.random() * 999999)
            selectedIngredientsId: selectedIngredientsId,
            total: total
        }

        props.completeCheckout(orderData);

    }

    const moveItem = (from: string, to: string) => {

        let tempArray = selectedIngredientsId;

        //console.log(tempArray);

        let fromIndex = tempArray.findIndex((v: string) => { return v === from });
        let toIndex = tempArray.findIndex((v: string) => { return v === to });

        let temp = tempArray[toIndex];
        tempArray[toIndex] = tempArray[fromIndex];
        tempArray[fromIndex] = temp;

        //console.log(tempArray);

        dispatch({
            type: SET_SELECTED_INGREDIENTS,
            selectedIngredientsId: tempArray
        });
    }

    const [{ isHover }, dropTarget] = useDrop({
        accept: 'add-ingredient',
        collect: (monitor: any) => ({
            isHover: monitor.isOver()
        }),
        drop(item: any) {

            props.addIngredient(item.id)
        },
    });

    return (
        <div className={styles['burger-constructor'] + ' pt-10 mt-15 pb-10 pl-4'} ref={dropTarget} style={{ outline: `2px dashed ${isHover ? '#4c4cff' : 'transparent'}`, }}>

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
                            handleClose={() => removeIngredientHandler(item._id)}
                        />
                    </li>
                ))}

                {bunList.length === 0 ?
                    <li className="text text_type_main-default" style={{ justifyContent: 'center' }}>
                        Обязательно попробуйте наши булки
                    </li>
                    : null}

            </ul>

            <ul className={stylesScrollable.scrollable + " pr-2 pt-4 pb-4"}>

                {ingredientList.map((item: any, i: any) => (

                    <li key={`${item._id}_${i}`} data-index={i}>

                        <DraggableElement id={item._id} index={i} onMoveItem={moveItem}>

                            <DragIcon type="primary" />

                            <ConstructorElement
                                isLocked={false}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                                handleClose={() => removeIngredientHandler(item._id)}
                            />
                        </DraggableElement>

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
                            handleClose={() => removeIngredientHandler(item._id)}
                        />
                    </li>
                ))}
            </ul>

            {bunList.length !== 0 ?
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

export default BurgerConstructor;