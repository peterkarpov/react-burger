import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ProfileOrdersListItem.module.css';


function ProfileOrdersListItem() {

    return (
        <div className={styles["profile-order-item"] + " p-6 mb-5"}>
            <div className={styles.number + " text text_type_main-medium mb-6"}>
                #034535
            </div>
            <div className={styles.time + " text text_type_main-medium text_color_inactive"}>
                Сегодня, 16:20 i-GMT+3
            </div>
            <div className={styles.name + " text text_type_main-medium mb-2"}>
                Death Star Starship Main бургер
            </div>
            <div className={styles.status + " text text_type_main-medium mb-6"}>
                Создан
            </div>

            <div className={styles["panel-bottom"]}>
                <ul className={styles["image-list"]}>

                    {Array.from([1, 2, 3].map((item: any) => {

                        return (
                            <li>
                                <div className={styles["image-item"]}>
                                    <img src="" alt={`${item}`} />
                                </div>
                            </li>
                        );

                    }))}

                    <li>
                        <div className={styles["image-item"]}>
                            <img src="" alt={`${99}`} />
                        </div>
                    </li>

                </ul>
                <div className={styles.total + " text text_type_main-medium"}>
                    <CurrencyIcon type="primary" onClick={undefined} />
                    480
                </div>
            </div>


        </div>
    );
}

export default ProfileOrdersListItem;