import styles from './IngredientDetails.module.css';

// import PropTypes from 'prop-types';
import IDataItem from '../../utils/Interfaces/IDataItem';

function IngredientDetails(props: { element: IDataItem, style: React.CSSProperties | undefined }) {

    if (!props.element) {
        return null;
    }

    return (
        <div className={styles["ingredient-info"]} style={props.style}>
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

// IngredientDetails.propTypes = {
//     element: PropTypes.shape({
//         _id: PropTypes.string,
//         name: PropTypes.string,
//         type: PropTypes.string,
//         proteins: PropTypes.number,
//         fat: PropTypes.number,
//         carbohydrates: PropTypes.number,
//         calories: PropTypes.number,
//         price: PropTypes.number,
//         image: PropTypes.string,
//         image_mobile: PropTypes.string,
//         image_large: PropTypes.string,
//         __v: PropTypes.number
//     }),
// };

export default IngredientDetails;