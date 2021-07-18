import React from 'react';

import {
    Tab,
    Counter,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import './BurgerIngredients.css';

import IDataItem from '../Interfaces/IDataItem';

interface BurgerIngredientsProps {
    data: IDataItem[],
    setIdForPopup: (id: string) => void,
    addIngredient: (id: string) => void,
    selectedIngredientsId: string[]
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

    getSelectedCountById = (id: string) => {
        return Array.from(this.props.selectedIngredientsId).filter((v: any) => v === id).length;
    }

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

    getTitleByType = function (current: string) {

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
                    <Tab value="bun" active={this.state.current === 'bun'} onClick={this.setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="sauce" active={this.state.current === 'sauce'} onClick={this.setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value="main" active={this.state.current === 'main'} onClick={this.setCurrent}>
                        Начинки
                    </Tab>
                </div>

                <ul className="tab-elements scrollable">

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

                                        return (
                                            <li
                                                key={item._id}
                                                className="list-item"
                                                onClick={() => this.onClickOnItem(item)}
                                            >

                                                <div className="counter-wrapper">
                                                    {count > 0 ? <Counter count={count} size="default" /> : null}
                                                </div>

                                                <div className="illustration pl-4 pr-4">
                                                    <img alt="illustration" src={item.image} />
                                                </div>

                                                <div className="price-block pt-1 pb-1">
                                                    <span className="price text text_type_digits-medium">{item.price}</span>
                                                    <CurrencyIcon type="primary" />
                                                </div>

                                                <div className="item-name text text_type_main-medium">
                                                    {item.name}
                                                </div>

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