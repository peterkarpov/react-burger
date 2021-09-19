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

import { SET_ORDER_STATUS, SET_SELECTED_INGREDIENTS } from '../../services/actions/basic';

import IDataItem from '../../utils/Interfaces/IDataItem';

//import { BurgerConstructorContext } from '../../services/BurgerConstructorContext';
//import { IBurgerConstructorContext } from '../../utils/Interfaces/IBurgerConstructorContext';

import DraggableElement from './DraggableElement';

import { DropTargetMonitor, useDrop } from "react-dnd";
import { TOrderInfo } from '../../utils/Interfaces/IBasicState';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

function BurgerConstructor(props: { removeIngredient: (id: string) => void, addIngredient: (id: string) => void, completeCheckout: (orderData: TOrderInfo) => void }) {

    //const { selectedIngredientsId, removeIngredient } = React.useContext<IBurgerConstructorContext>(BurgerConstructorContext);
    const { selectedIngredientsId, data, orderStatus } = useAppSelector(state => state.basic);

    const dispatch = useAppDispatch();

    const ingredientItems = Array.from<string>(selectedIngredientsId)
        .map((v: string) => {
            return data.find((val: IDataItem) => { return val._id === v; })
        }) as IDataItem[];

    const bunList = ingredientItems
        .filter((v: (IDataItem)) => { return v?.type === 'bun' })
        .filter((v: (IDataItem), i: number, a: (IDataItem)[]) => { return a.indexOf(v) === i; });

    const ingredientList = ingredientItems
        .filter((v: IDataItem) => { return v.type !== 'bun' });

    const [total, dispatchTotal] = useReducer(((state: number) => {

        return Array.from(ingredientItems)
            .map((v: (IDataItem)) => { return v!.price })
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

        dispatch({
            type: SET_ORDER_STATUS,
            status: "IN_PROGRESS"
        });

        // setTimeout(function () {
        //     dispatch({
        //         type: SET_ORDER_STATUS,
        //         status: null
        //     });
        // }, 1000 * 15);

        const orderData: TOrderInfo = {
            orderNumber: null,//Math.floor(Math.random() * 999999)
            selectedIngredientsId: selectedIngredientsId,
            total: total
        }

        props.completeCheckout(orderData);
    }

    const moveItem = (from: string, to: string, indexFrom: number, indexTo: number) => {

        let tempArray = ingredientList.map<string>((v) => v?._id);

        //console.log(tempArray);

        //let fromIndex = tempArray.findIndex((v: string) => { return v === from });
        //let toIndex = tempArray.findIndex((v: string) => { return v === to });

        let fromIndex = tempArray.findIndex((v, i: number) => { return i === indexFrom });
        let toIndex = tempArray.findIndex((v, i: number) => { return i === indexTo });

        let temp = tempArray[toIndex];
        tempArray[toIndex] = tempArray[fromIndex];
        tempArray[fromIndex] = temp;

        //console.log(tempArray);

        tempArray = tempArray.concat(bunList.map((v) => v?._id));
        tempArray = tempArray.concat(bunList.map((v) => v?._id));

        dispatch({
            type: SET_SELECTED_INGREDIENTS,
            selectedIngredientsId: tempArray
        });
    }

    const [{ isHover }, dropTarget] = useDrop({
        accept: 'add-ingredient',
        collect: (monitor: DropTargetMonitor) => ({
            isHover: monitor.isOver()
        }),
        drop(item: { id: string }) {

            props.addIngredient(item.id)
        },
    });

    return (
        <div className={styles['burger-constructor'] + ' pt-10 mt-15 pb-10 pl-4'} ref={dropTarget} style={{ outline: `2px dashed ${isHover ? '#4c4cff' : 'transparent'}`, }}>

            <ul className={styles['top'] + " pr-4"}>
                {bunList.map((item: IDataItem, i) => (
                    <li key={`${item._id}_${i}`}>
                        {bunList.length > 1 ? <DragIcon type="primary" /> : null}
                        <ConstructorElement
                            type="top"
                            isLocked={bunList.length === 1}
                            text={item.name + ' (верх)'}
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

                {ingredientList.map((item: IDataItem, i: number) => (

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
                {bunList.map((item: IDataItem, i) => (
                    <li key={`${item._id}_${i}`}>
                        {bunList.length > 1 ? <DragIcon type="primary" /> : null}
                        <ConstructorElement
                            type="bottom"
                            isLocked={bunList.length === 1}
                            text={item.name + ' (низ)'}
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

                    {orderStatus === "ERROR" ?
                        <>
                            <div className="text text_type_main-default ml-4">
                                Невозможно выполнить заказ
                            </div>
                            <div className={styles["button-wrapper"] + " ml-10"}>
                                <Button type="primary" size="large" onClick={checkout}>
                                    Попробовать снова
                                </Button>
                            </div>
                        </>
                        : null}

                    {orderStatus === "IN_PROGRESS" ?
                        <div className="text text_type_main-default ml-4">
                            Дождитесь оформления заказа
                        </div>
                        : null}

                    {orderStatus === null ?
                        <div className={styles["button-wrapper"] + " ml-10"}>
                            <Button type="primary" size="large" onClick={checkout}>
                                Оформить заказ
                            </Button>
                        </div>
                        : null}

                </div>
                : null}

        </div>
    );
}

export default BurgerConstructor;