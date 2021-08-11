import IDataItem from '../../utils/Interfaces/IDataItem';

import {
    Counter,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from '../BurgerIngredients/BurgerIngredients.module.css';

import { useDrag } from "react-dnd";

function BurgerIngredientListItem(props: {
    item: IDataItem,
    quantity: number,
    count: number,
    onClickOnItem: (item: IDataItem) => void
}) {


    const [{ opacity }, dragRef] = useDrag({
        type: 'add-ingredient',
        item: {
            id: props.item._id,
        },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0 : 1,
        })
    });

    return (
        <>

            <div style={{ opacity: opacity, cursor: 'grab' }} ref={dragRef}>

                <div className={styles["counter-wrapper"]}>
                    {props.count > 0 ?
                        <Counter count={props.count} size="default" />
                        : null}
                </div>

                {/* TODO сначала не понял для чего нужен счетчик, думал это количество выбранных элементов, а оказалось количество оставшихся */}
                {/* <div className="counter-wrapper counter-wrapper-left">
                    {props.quantity > 0 ? 
                        <Counter count={props.quantity} size="default" /> 
                        : null}
                </div> */}

                <div className={`${styles["illustration"]} pl-4 pr-4`}>
                    <img alt="illustration" src={props.item.image} />
                </div>

                <div className={`${styles["price-block"]} pt-1 pb-1`}>
                    <span className={`${styles.price} text text_type_digits-medium`}>{props.item.price}</span>
                    <CurrencyIcon type="primary" />
                </div>

                <div className={`${styles["item-name"]} text text_type_main-medium`}>
                    {props.item.name}
                </div>

            </div>
        </>
    )
}

export default BurgerIngredientListItem;