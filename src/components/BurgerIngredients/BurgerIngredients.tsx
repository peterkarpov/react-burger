import React from 'react';

import {
    Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';

import './BurgerIngredients.css';

import IDataItem from '../Interfaces/IDataItem';

import BurgerIngredientListItem from '../BurgerIngredientListItem/BurgerIngredientListItem';

interface BurgerIngredientsProps {
    data: IDataItem[],
    setIdForPopup: (id: string) => void,
    addIngredient: (id: string) => void,
    selectedIngredientsId: string[],
    quantityData: {id:string, quantity:number}[]
};

interface BurgerIngredientsState {
    current: string,
    currentItems: IDataItem[]
};

class BurgerIngredients extends React.Component<BurgerIngredientsProps, BurgerIngredientsState> {

    state = {
        current: '',
        currentItems: []
    }

    static getDerivedStateFromProps(props: BurgerIngredientsProps, state: BurgerIngredientsState) {

        if (state.current !== '') {
            state.currentItems = Array.from(props.data)
                .filter((v: IDataItem, i, a) => { return v.type === state.current });
        } else {
            state.currentItems = props.data;
        }

        return state;
    }

    setCurrent = (value: string) => {
        this.setState({
            ...this.state,
            current: value,
            currentItems: Array.from(this.props.data).filter((v: any, i, a) => { return v.type === this.state.current })
        });
    };

    componentDidMount() {
        console.log('componentDidMount');
    }

    getUnicleType = (data: IDataItem[]) => {
        return Array.from(data)
            .map(function (v: IDataItem, i, a) { return v.type; })
            .filter(function (v, i, a) { return a.indexOf(v) === i; });
    };

    getItemsByType = (type: string, data: IDataItem[]) => {
        return data.filter((v: IDataItem) => { return v.type === type });
    };

    getSelectedCountById = (id: string) => {
        return Array.from(this.props.selectedIngredientsId).filter((v: string) => v === id).length;
    }

    getQuantityCountById = (id: string) => {
        return this.props.quantityData.find((v: { id: string, quantity: number }) => v.id === id)?.quantity || 0;
    }
    
    getTitleByType = (current: string) => {

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
 
    onClickOnItem = (item: IDataItem) => {

        this.props.addIngredient(item._id);
        //this.props.setIdForPopup(item._id);
    }

    render() {
        return (
            <div className="burger-ingredients">

                <div className="text text_type_main-large mt-10 mb-5">
                    Соберите бургер
                </div>

                <div className="tab-bar mt-5 mb-10">
                    {['bun', 'sauce', 'main'].map((tab: string, i) => {
                        return (
                            <React.Fragment key={tab}>
                                <Tab value={tab}
                                    active={this.state.current === tab}
                                    onClick={this.setCurrent}
                                >
                                    {this.getTitleByType(tab)}
                                </Tab>
                            </React.Fragment>
                        )
                    })}
                </div>

                <ul className="tab-elements scrollable">

                    {/* TODO задел на то, что типы в исходном json могут быть еще добавлены и не придется переписывать много логики */}
                    {this.getUnicleType(this.state.currentItems).map((type, i) => {

                        let items = this.getItemsByType(type, this.state.currentItems);

                        return (
                            <li key={type}>

                                <div className="text text_type_main-medium">
                                    {this.getTitleByType(type)}
                                </div>

                                <ul className="ingredients-list pt-6 pl-4 pr-4 pb-10">

                                    {items.map((item: IDataItem, i: any) => {

                                        let count = this.getSelectedCountById(item._id);
                                        let quantity = this.getQuantityCountById(item._id);

                                        return (
                                            // TODO если вот так, то не ругается на обязательный key  
                                            <li
                                                key={item._id}
                                                className="list-item"
                                                onClick={() => this.onClickOnItem(item)}
                                            >
                                                <BurgerIngredientListItem
                                                    item={item}
                                                    quantity={quantity}
                                                    count={count}
                                                    onClickOnItem={this.onClickOnItem}
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
}

export default BurgerIngredients;