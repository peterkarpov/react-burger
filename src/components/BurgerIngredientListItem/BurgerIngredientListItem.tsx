import IDataItem from '../Interfaces/IDataItem';

import {
    Counter,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredientListItem(props: {
    item: IDataItem,
    quantity: number,
    count: number,
    onClickOnItem: (item: IDataItem) => void
}) {

    return (
        <>
            <div className="counter-wrapper">
                {props.quantity > 0 ?
                    <Counter count={props.quantity} size="default" />
                    : null}
            </div>

            {/* TODO сначала не понял для чего нужен счетчик, думал это количество выбранных элементов, а оказалось количество оставшихся */}
            {/* <div className="counter-wrapper counter-wrapper-left">
                    {props.count > 0 ? <Counter count={props.count} size="default" /> : null}
                </div> */}

            <div className="illustration pl-4 pr-4">
                <img alt="illustration" src={props.item.image} />
            </div>

            <div className="price-block pt-1 pb-1">
                <span className="price text text_type_digits-medium">{props.item.price}</span>
                <CurrencyIcon type="primary" />
            </div>

            <div className="item-name text text_type_main-medium">
                {props.item.name}
            </div>
        </>
    )
}

export default BurgerIngredientListItem;