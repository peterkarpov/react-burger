import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from './../../services/auth';
import React from "react";
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Feed.module.css';
import { updateUser, signOut } from '../../services/actions/auth';
import { useDispatch } from 'react-redux';
import stylesScrollable from '../../css/scrollable.module.css';
import ProfileOrdersListItem from '../ProfileOrdersListItem/ProfileOrdersListItem';

function Feed() {

    const { pathname, state } = useLocation();
    const auth = useAuth();
    const dispatch = useDispatch();

    const history = useHistory();

    const onClickProfileOrderItem = (item: any) => {

        alert(item._id);

        // history.replace({ pathname: `/profile/order/${item._id}`, state });
    }

    return (
        <>
            <section className={`${styles.feed}`}>

                <div className={styles["main-title"] + " text_type_main-medium"}>
                    Лента заказов
                </div>

                <div className={styles["block-aside"]}>
                    <div className={`${styles['left-aside']}`}>

                        <ul className={`profile-order-list ${stylesScrollable.scrollable} pr-2`} style={{ maxHeight: "60vh" }}>

                            {Array.from([1, 2, 3, 4, 5, 6]).map((item: any) => {

                                return (
                                    <li
                                        key={item._id}
                                        className={""}
                                        onClick={() => onClickProfileOrderItem(item)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <ProfileOrdersListItem />

                                    </li>
                                )
                            })}

                        </ul>

                    </div>

                    <div className={`${styles['right-aside']}`}>

                        <div className={styles["feed-info"]}>

                            <div className={styles["block-status"]}>
                                <div className={styles["block-ready"]}>
                                    <div className={styles.title + " text_type_main-medium mb-6"}>
                                        Готовы:
                                    </div>
                                    <ul>
                                        {Array.from(['034533', '034534', '034535']).map((item) => {

                                            return (
                                                <li key={`${item}`}
                                                    className="text_type_digits-default"
                                                >
                                                    {item}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                                <div className={styles["block-in-work"]}>
                                    <div className={styles.title + " text_type_main-medium mb-6"}>
                                        В работе:
                                    </div>
                                    <ul>
                                        {Array.from(['111111', '222222', '333333', '444444']).map((item) => {

                                            return (
                                                <li key={`${item}`}
                                                    className="text_type_digits-default"
                                                >
                                                    {item}
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
                                28 752
                            </div>
                            <div className={styles.title + " text text_type_main-medium mt-15"}>
                                Выполнено за сегодня
                            </div>
                            <div className={styles["complete-today"] + " text text_type_digits-large"}>
                                138
                            </div>

                        </div>


                    </div>

                </div>


            </section>
        </>
    );
}

export default Feed;