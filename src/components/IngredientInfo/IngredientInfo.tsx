import styles from './IngredientInfo.module.css';

function IngredientInfo(props: { element: any }) {

    return (
        <div className={styles["ingredient-info"]}>
            <div className={styles["icon-wrapper"] + " mb-4"}>
                <img src={props.element.image_large} alt="icon-wrapper-img" />
            </div>
            <div className={styles.title + " text text_type_main-medium mt-4 mb-8"}>
                {props.element.name}
            </div>
            <ul className={styles["composition-list"] + " text_color_inactive"}>
                <li className={styles["composition-item"]}>
                    <div className={styles.title + " text text_type_main-medium"}>
                        Калории, ккал
                    </div>
                    <div className={styles.value + " text text_type_digits-default mt-2"}>
                        {props.element.calories}
                    </div>
                </li>
                <li className={styles["composition-item"]}>
                    <div className={styles.title + " text text_type_main-medium"}>
                        Белки, г
                    </div>
                    <div className={styles.value + " text text_type_digits-default mt-2"}>
                        {props.element.proteins}
                    </div>
                </li>
                <li className={styles["composition-item"]}>
                    <div className={styles.title + " text text_type_main-medium"}>
                        Жиры, г
                    </div>
                    <div className={styles.value + " text text_type_digits-default mt-2"}>
                        {props.element.fat}
                    </div>
                </li>
                <li className={styles["composition-item"]}>
                    <div className={styles.title + " text text_type_main-medium"}>
                        Углеводы, г
                    </div>
                    <div className={styles.value + " text text_type_digits-default mt-2"}>
                        {props.element.carbohydrates}
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default IngredientInfo;