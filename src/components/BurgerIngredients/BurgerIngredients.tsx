import React from 'react';

import {
    Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerIngredients.module.css';
import stylesScrollable from '../../css/scrollable.module.css';

import IDataItem from '../../utils/Interfaces/IDataItem';

import BurgerIngredientListItem from '../BurgerIngredientListItem/BurgerIngredientListItem';

import { BurgerConstructorContext } from '../../services/BurgerConstructorContext';

import { IBurgerIngredientsProps } from '../../utils/Interfaces/IBurgerIngredientsProps';

import { IBurgerIngredientsState } from '../../utils/Interfaces/IBurgerIngredientsState';

function BurgerIngredients(props: IBurgerIngredientsProps) {

    const [state, setState] = React.useState<IBurgerIngredientsState>({ current: '', currentItems: props.data });

    const { selectedIngredientsId, addIngredient } = React.useContext<{ selectedIngredientsId: string[], addIngredient: (id: string) => void }>(BurgerConstructorContext)

    const setCurrent = (value: string) => {
        setState({
            ...state,
            current: value,
            currentItems: Array.from(props.data).filter((v: IDataItem) => { return v.type === value })
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

        addIngredient(item._id);
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

            <ul className={`${styles["tab-elements"]} ${stylesScrollable.scrollable}`}>

                {/* TODO задел на то, что типы в исходном json могут быть еще добавлены и не придется переписывать много логики */}
                {getUnicleType(state.currentItems).map((type, i) => {

                    return (
                        <li key={type}>

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