import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './OrderInfo.module.css';
import stylesScrollable from '../../css/scrollable.module.css';

function OrderInfo() {

    return (
        <>
            <section className={styles["order-info"]}>
                <div className={styles["number"] + " mb-10 text text_type_digits-medium"}>
                    #034533
                </div>
                <div className={styles["name"] + " mb-3 text text_type_main-medium"}>
                    Black Hole Singularity острый бургер
                </div>
                <div className={`${styles["status"]} ${styles["complete"]} mb-15 text text_type_main-medium`}>
                    Выполнен
                </div>
                <div className={styles["title"] + " mb-6 text text_type_main-medium"}>
                    Состав:
                </div>

                <ul className={`${styles["order-elements"]} ${stylesScrollable.scrollable}`}>

                    {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9]).map((item) => {

                        return (
                            <li className={"mb-4"}>
                                <div className={styles["order-elements-item"]}>
                                    <div className={styles["image"]}>
                                        <img src="" alt={`${item}`} />
                                    </div>
                                    <div className={styles["name"] + " ml-4 mr-4 text text_type_main-medium"}>
                                        Флюоресцентная булка {item}
                                        Флюоресцентная булка {item}
                                        Флюоресцентная булка {item}

                                    </div>
                                    <div className={styles["total"] + " text text_type_digits-medium"}>
                                        <span className={"mr-2"}>2 x 20</span>
                                        <CurrencyIcon type="primary" onClick={undefined} />
                                    </div>
                                </div>
                            </li>
                        )

                    })}


                </ul>

                <div className={styles["bottom-block"] + " mt-10"}>
                    <div className={styles["time"] + " text text_type_main-medium text_color_inactive"}>
                        Вчера, 13:50 i-GTM+3
                    </div>
                    <div className={styles["total"] + " text text_type_digits-medium"}>
                        <span className={"mr-2"}>510</span>
                        <CurrencyIcon type="primary" onClick={undefined} />
                    </div>
                </div>

            </section>
        </>
    );
}

export default OrderInfo;