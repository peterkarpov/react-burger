import { useHistory } from 'react-router-dom';
import { useEffect } from "react";
import styles from './Feed.module.css';
import { useDispatch, useSelector } from 'react-redux';
import stylesScrollable from '../../css/scrollable.module.css';
import ProfileOrdersListItem from '../ProfileOrdersListItem/ProfileOrdersListItem';
import { WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_START } from '../../services/actions/wsActionTypes';
import Loader from '../pages/Loader';
import { actionInitData } from '../../services/actions/basic';

function Feed() {

    const { data } = useSelector<any, any>(state => state.basic);



    const dispatch = useDispatch();

    const history = useHistory();

    const feed = useSelector<any, any>(state => state.feed);

    useEffect(() => {

        dispatch(actionInitData());

        dispatch({ type: WS_FEED_CONNECTION_START });

        return () => {

            dispatch({ type: WS_FEED_CONNECTION_CLOSED });
        }
    }, [dispatch]);

    const onClickProfileOrderItem = (item: any) => {
        history.replace({ pathname: `/feed/${item.number}`, state: { from: history.location, number: item.number } });
    }

    if (!!!feed) {
        return (<Loader />)
    }

    return (
        <>
            <section className={`${styles.feed}`}>

                <div className={styles["main-title"] + " text_type_main-medium"}>
                    Лента заказов
                </div>

                <div className={styles["block-aside"]}>
                    <div className={`${styles['left-aside']}`}>

                        {feed.wsConnected
                            ?
                            <ul className={`profile-order-list ${stylesScrollable.scrollable} pr-2`} style={{ maxHeight: "60vh" }}>

                                {feed.orders.map((item: any) => {

                                    return (
                                        <li
                                            key={item._id}
                                            className={""}
                                            onClick={() => onClickProfileOrderItem(item)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <ProfileOrdersListItem item={item} data={data} isShowStatus={false} />

                                        </li>
                                    )
                                })}

                            </ul>
                            :
                            <Loader />
                        }



                    </div>

                    <div className={`${styles['right-aside']}`}>

                        <div className={styles["feed-info"]}>

                            <div className={styles["block-status"]}>
                                <div className={styles["block-ready"]}>
                                    <div className={styles.title + " text_type_main-medium mb-6"}>
                                        Готовы:
                                    </div>
                                    <ul className={`${stylesScrollable.scrollable}`} style={{ maxHeight: '172px' }}>
                                        {Array.from(feed.orders.filter((v: any) => v.status === 'done')).map((item: any) => {

                                            return (
                                                <li key={`${item.number}`}
                                                    className="text_type_digits-default"
                                                >
                                                    {item.number}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                                <div className={styles["block-in-work"]}>
                                    <div className={styles.title + " text_type_main-medium mb-6"}>
                                        В работе:
                                    </div>
                                    <ul className={`${stylesScrollable.scrollable}`} style={{ maxHeight: '172px' }}>
                                        {Array.from(feed.orders.filter((v: any) => v.status !== 'done')).map((item: any) => {

                                            return (
                                                <li key={`${item.number}`}
                                                    className="text_type_digits-default"
                                                >
                                                    {item.number}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.title + " text text_type_main-medium mt-15"}>
                                Выполнено за все время
                            </div>
                            <div className={styles["complete-total"] + " text text_type_digits-large"}>
                                {feed.total}
                            </div>
                            <div className={styles.title + " text text_type_main-medium mt-15"}>
                                Выполнено за сегодня
                            </div>
                            <div className={styles["complete-today"] + " text text_type_digits-large"}>
                                {feed.totalToday}
                            </div>

                        </div>


                    </div>

                </div>


            </section>
        </>
    );
}

export default Feed;