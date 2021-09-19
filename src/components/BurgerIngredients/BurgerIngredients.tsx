import React, { useEffect, useRef } from 'react';

import {
    Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerIngredients.module.css';
import stylesScrollable from '../../css/scrollable.module.css';

import IDataItem from '../../utils/Interfaces/IDataItem';

import BurgerIngredientListItem from '../BurgerIngredientListItem/BurgerIngredientListItem';

//import { BurgerConstructorContext } from '../../services/BurgerConstructorContext';

import { IBurgerIngredientsProps } from '../../utils/Interfaces/IBurgerIngredientsProps';

import { IBurgerIngredientsState } from '../../utils/Interfaces/IBurgerIngredientsState';

import { useAppSelector } from '../../utils/hooks';

function BurgerIngredients(props: IBurgerIngredientsProps) {

    //const { selectedIngredientsId, addIngredient } = React.useContext<{ selectedIngredientsId: string[], addIngredient: (id: string) => void }>(BurgerConstructorContext);
    const { selectedIngredientsId, data } = useAppSelector(state => state.basic);

    const [state, setState] = React.useState<IBurgerIngredientsState>({ current: 'bun', currentItems: data });

    const tabElementsRef = useRef<HTMLUListElement>(null);
    const forBunRef = useRef<HTMLLIElement>(null);
    const forSauceRef = useRef<HTMLLIElement>(null);
    const forMainRef = useRef<any>(null);

    const getRefByType = (type: string) => {

        if (type === 'bun') {
            return forBunRef;
        } else if (type === 'sauce') {
            return forSauceRef;
        } else if (type === 'main') {
            return forMainRef;
        };

    }

    const tabElementsRef_current = tabElementsRef.current;

    useEffect(() => {

        const onScroll = (e: any) => {

            // console.log('-------------------------------');

            // console.log(`e.currentTarget.scrollTop  ${e.currentTarget.scrollTop}`);

            // console.log(`forBunRef\toffsetHeight: ${forBunRef.current?.offsetHeight}\toffsetTop: ${forBunRef.current?.offsetTop}\tscrollTop: ${forBunRef.current?.scrollTop}\tdistance: ${forBunRef.current?.offsetTop - e.currentTarget?.scrollTop}   `);
            // console.log(`forMainRef\toffsetHeight: ${forMainRef.current?.offsetHeight}\toffsetTop: ${forMainRef.current?.offsetTop}\tscrollTop: ${forMainRef.current?.scrollTop}\tdistance: ${forMainRef.current?.offsetTop - e.currentTarget?.scrollTop}  `);
            // console.log(`forSauceRef\toffsetHeight: ${forSauceRef.current?.offsetHeight}\toffsetTop: ${forSauceRef.current?.offsetTop}\tscrollTop: ${forSauceRef.current?.scrollTop}\tdistance: ${forSauceRef.current?.offsetTop - e.currentTarget?.scrollTop} `);

            ////    old version
            // if (0 < e.currentTarget.scrollTop && e.currentTarget.scrollTop < forBunRef.current?.offsetTop) {
            //     //console.log(getTitleByType(forBunRef.current?.getAttribute('data-type')));
            //     setState({ ...state, current: forBunRef.current?.getAttribute('data-type') });
            // } else if (forBunRef.current?.offsetTop < e.currentTarget.scrollTop && e.currentTarget.scrollTop < (forBunRef.current?.offsetTop + forMainRef.current?.offsetTop)) {
            //     //console.log('начинка');
            //     setState({ ...state, current: 'main' });
            // } else if ((forBunRef.current?.offsetTop + forMainRef.current?.offsetTop) < e.currentTarget.scrollTop && e.currentTarget.scrollTop < (forBunRef.current?.offsetTop + forMainRef.current?.offsetTop + forSauceRef.current?.offsetTop)) {
            //     //console.log('соус');
            //     setState({ ...state, current: 'sauce' });
            // }

            let previousValue = 0;
            Array.from(getUnicleType(state.currentItems))
                .map((v) => {
                    return {
                        ref: getRefByType(v),
                        type: v
                    }
                })
                .some((v) => {

                    if (previousValue < e.currentTarget.scrollTop && e.currentTarget.scrollTop < v.ref?.current?.offsetTop) {

                        setState({ ...state, current: v.type });

                        return true;

                    } else {

                        previousValue += v.ref?.current?.offsetTop;

                        return false;
                    }

                });

        };

        tabElementsRef_current?.addEventListener("scroll", onScroll);

        return () => tabElementsRef_current?.removeEventListener("scroll", onScroll);

    }, [tabElementsRef, state, tabElementsRef_current]);

    const setCurrent = (value: string) => {
        setState({
            ...state,
            current: value,
            currentItems: Array.from<IDataItem>(data).filter((v: IDataItem) => { return v.type === value })
        });
    };

    const getUnicleType = (data: IDataItem[]) => {
        return Array.from(data)
            .map(function (v: IDataItem) { return v.type; })
            .filter(function (v, i, a) { return a.indexOf(v) === i; });
    };

    const getItemsByType = (type: string, data: IDataItem[]) => {

        if (type === '') {
            return data;
        } else {
            return data.filter((v: IDataItem) => { return v.type === type });
        }

    };

    const getSelectedCountById = (id: string) => {
        return Array.from(selectedIngredientsId).filter((v: string) => v === id).length;
    }

    const getQuantityCountById = (id: string) => {
        return props.quantityData.find((v: { id: string, quantity: number }) => v.id === id)?.quantity || 0;
    }

    const getTitleByType = (current: string) => {

        let title = '';

        if (current === 'bun') {
            title = 'Булки';
        } else if (current === 'sauce') {
            title = 'Соусы';
        } else if (current === 'main') {
            title = 'Начинка';
        };

        return title;
    };

    const onClickOnItem = (item: IDataItem) => {

        props.onClickOnIngredient(item._id);
        //this.props.setIdForPopup(item._id);
    }

    return (
        <div className={styles["burger-ingredients"]}>

            <div className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </div>

            <div className={styles["tab-bar"] + " mt-5 mb-10"}>
                {['bun', 'sauce', 'main'].map((tab: string, i) => {
                    return (
                        <React.Fragment key={tab}>
                            <Tab value={tab}
                                active={state.current === tab}
                                onClick={setCurrent}
                            >
                                {getTitleByType(tab)}
                            </Tab>
                        </React.Fragment>
                    )
                })}
            </div>

            <ul className={`${styles["tab-elements"]} ${stylesScrollable.scrollable}`} ref={tabElementsRef}>

                {/* TODO задел на то, что типы в исходном json могут быть еще добавлены и не придется переписывать много логики */}
                {getUnicleType(state.currentItems).map((type, i) => {

                    return (
                        <li key={type} ref={getRefByType(type)} data-type={type}>

                            <div className="text text_type_main-medium">
                                {getTitleByType(type)}
                            </div>

                            <ul className={`${styles["ingredients-list"]} pt-6 pl-4 pr-4 pb-10`}>

                                {getItemsByType(type, state.currentItems).map((item: IDataItem) => {

                                    let count = getSelectedCountById(item._id);
                                    let quantity = getQuantityCountById(item._id);

                                    return (
                                        // TODO если вот так, то не ругается на обязательный key  
                                        <li
                                            key={item._id}
                                            className={styles["list-item"]}
                                            onClick={() => onClickOnItem(item)}
                                        >
                                            <BurgerIngredientListItem
                                                item={item}
                                                quantity={quantity}
                                                count={count}
                                                onClickOnItem={onClickOnItem}
                                            />
                                        </li>
                                    )
                                })}

                            </ul>

                        </li>
                    )
                })}

            </ul>


        </div>
    );
}

export default BurgerIngredients;