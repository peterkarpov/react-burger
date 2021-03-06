import {
    CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import './IngredientInfoModal.css';

// import PropTypes from 'prop-types';
import IDataItem from '../../utils/Interfaces/IDataItem';

function IngredientInfoModal(props: { element: IDataItem, clearPopup: () => void }) {

    return (
        <div className="ingredient-info" onClick={props.clearPopup}>
            <div className="modal pt-10 pl-10 pr-10 pb-15">
                <div className="modal-header">
                    <span className="modal-title text text_type_main-large">
                        Детали ингридиента
                    </span>
                    <div className="close-icon-wrapper" onClick={props.clearPopup}>
                        <CloseIcon type="primary" />
                    </div>
                </div>

                <div className="wrapper">

                    <div className="icon-wrapper mb-4">
                        <img src={props.element.image_large} alt="icon-wrapper-img" />
                    </div>
                    <div className="title text text_type_main-medium mt-4 mb-8">
                        {props.element.name}
                    </div>
                    <ul className="composition-list text_color_inactive">
                        <li className="composition-item">
                            <div className="title text text_type_main-medium">
                                Калории, ккал
                            </div>
                            <div className="value text text_type_digits-default mt-2">
                                {props.element.calories}
                            </div>
                        </li>
                        <li className="composition-item">
                            <div className="title text text_type_main-medium">
                                Белки, г
                            </div>
                            <div className="value text text_type_digits-default mt-2">
                                {props.element.proteins}
                            </div>
                        </li>
                        <li className="composition-item ">
                            <div className="title text text_type_main-medium">
                                Жиры, г
                            </div>
                            <div className="value text text_type_digits-default mt-2">
                                {props.element.fat}
                            </div>
                        </li>
                        <li className="composition-item">
                            <div className="title text text_type_main-medium">
                                Углеводы, г
                            </div>
                            <div className="value text text_type_digits-default mt-2">
                                {props.element.carbohydrates}
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
}

// IngredientInfoModal.propTypes = {
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
//     clearPopup: PropTypes.func,
// };

export default IngredientInfoModal;