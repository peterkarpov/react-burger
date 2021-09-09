import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './OrderInfo.module.css';
import stylesScrollable from '../../css/scrollable.module.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START, WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_START } from '../../services/actions/wsActionTypes';
import { useEffect } from 'react';
import { actionInitData } from '../../services/actions/basic';
import IDataItem from '../../utils/Interfaces/IDataItem';
import { getDateTimeInSpecialFormat } from '../../services/utils';
import Loader from '../pages/Loader';

function OrderInfo() {

    const { data } = useSelector<any, any>(state => state.basic);
    const { id } = useParams<any>();
    const dispatch = useDispatch();

    const feed = useSelector<any, any>(state => state.feed);
    const profileOrders = useSelector<any, any>(state => state.profileOrders);

    useEffect(() => {

        dispatch(actionInitData());

        dispatch({ type: WS_FEED_CONNECTION_START });
        dispatch({ type: WS_CONNECTION_START });

        return () => {

            dispatch({ type: WS_FEED_CONNECTION_CLOSED });
            dispatch({ type: WS_CONNECTION_CLOSED });
        }
    }, [dispatch]);

    const order = [...feed.orders, ...profileOrders.orders].find((v: any) => v._id === id);

    const uniqueIngredients = order?.ingredients
        .filter((v: (string | undefined), i: number, a: (string | undefined)[]) => { return a.indexOf(v) === i; });

    const getIngredientById = (id: string) => {
        return data.find((v: IDataItem) => { return v._id === id })
    }

    const getCount = (id: string) => {
        return order.ingredients.filter((v: string) => v === id).length;
    }

    const total = Array.from<string>(order?.ingredients || [])
        .map((id: string) => { return getIngredientById(id)?.price || 0 })
        .reduce((previousValue: any, currentValue: any) => previousValue + currentValue, 0);

    const getDateTime = getDateTimeInSpecialFormat;

    const getStatus = (status: string) => {
        if (status === 'done') {
            return "Выполнен";
        } else {
            return status;
        }
    };

    if (!!!order) {
        return <Loader />;
    }

    return (
        <>
            <section className={styles["order-info"]}>
                <div className={styles["number"] + " mb-10 text text_type_digits-medium"}>
                    #{order.number}
                </div>
                <div className={styles["name"] + " mb-3 text text_type_main-medium"}>
                    {order.name}
                </div>
                <div className={`${styles["status"]} ${order.status === 'done' ? styles["complete"] : null} mb-15 text text_type_main-medium`}>
                    {getStatus(order.status)}
                </div>
                <div className={styles["title"] + " mb-6 text text_type_main-medium"}>
                    Состав:
                </div>

                <ul className={`${styles["order-elements"]} ${stylesScrollable.scrollable}`}>

                    {Array.from<string>(uniqueIngredients).map((id: string) => {

                        const ingredient = getIngredientById(id);
                        const count = getCount(id);

                        return (
                            <li key={id}
                                className={"mb-4"}
                                >
                                <div className={styles["order-elements-item"]}>
                                    <div className={styles["image"]}>
                                        <img src={`${ingredient.image}`} alt={`${ingredient.image}`} />
                                    </div>
                                    <div className={styles["name"] + " ml-4 mr-4 text text_type_main-medium"}>
                                        {ingredient.name}
                                    </div>
                                    <div className={styles["total"] + " text text_type_digits-medium"}>
                                        <span className={"mr-2"}>{count} x {ingredient.price}</span>
                                        <CurrencyIcon type="primary" onClick={undefined} />
                                    </div>
                                </div>
                            </li>
                        )

                    })}

                </ul>

                <div className={styles["bottom-block"] + " mt-10"}>
                    <div className={styles["time"] + " text text_type_main-medium text_color_inactive"}>
                        {getDateTime(order.createdAt)}
                    </div>
                    <div className={styles["total"] + " text text_type_digits-medium"}>
                        <span className={"mr-2"}>{total}</span>
                        <CurrencyIcon type="primary" onClick={undefined} />
                    </div>
                </div>

            </section>
        </>
    );
}

export default OrderInfo;