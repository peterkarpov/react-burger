import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionInitData } from '../../services/actions/basic';
import { getDateTimeInSpecialFormat } from '../../services/utils';
import IDataItem from '../../utils/Interfaces/IDataItem';
import styles from './ProfileOrdersListItem.module.css';

function ProfileOrdersListItem(props: { item: any, isShowStatus: boolean }) {

    const { data } = useSelector<any, any>(state => state.basic);

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(actionInitData());

    }, [dispatch]);

    const getIngredientById = (id: string) => {
        return data.find((v: IDataItem) => { return v._id === id })
    }

    const total = Array.from<string>(props?.item?.ingredients)
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

    return (
        <div className={styles["profile-order-item"] + " p-6 mb-5"}>

            <div className={styles.number + " text text_type_digits-medium mb-6"}>
                #{props.item.number}
            </div>

            <div className={styles.time + " text text_type_main-medium text_color_inactive"}>
                {getDateTime(props.item.createdAt)}
            </div>

            <div className={styles.name + " text text_type_main-medium mb-2"}>
                {props.item.name}
            </div>
            
            {props.isShowStatus ?
                <div className={styles.status + " text text_type_main-medium"}>
                    {getStatus(props.item.status)}
                </div>
                : null}
            
            <div className={styles["panel-bottom"] + " mt-6"}>
                <ul className={styles["image-list"]}>

                    {data && Array.from(props.item.ingredients).filter((v, i: number) => i < 5).map((itemId: any, i: number) => {

                        const ingredient = getIngredientById(itemId);

                        return (
                            <li key={`${itemId}_${i}`}>
                                <div className={styles["image-item"]} style={{ zIndex: 1000 - i }}>
                                    <img src={ingredient?.image} alt={`${ingredient?.image}`} />
                                </div>
                            </li>
                        );

                    })}

                    {props.item.ingredients[5] !== undefined ?
                        <li key={`other`}>
                            <div className={styles["image-item"]}>
                                <span className={styles["offset-count"] + " text text_type_main-medium"}>
                                    {`+${props.item.ingredients.length - 5}`}
                                </span>
                                <img style={{ opacity: '0.5' }} src={getIngredientById(props.item.ingredients[5])?.image} alt="" />
                            </div>
                        </li>
                        : null}

                </ul>

                <div className={styles.total + " text text_type_digits-medium"}>
                    <CurrencyIcon type="primary" onClick={undefined} />
                    <span>{total}</span>
                </div>

            </div>

        </div>
    );
}

export default ProfileOrdersListItem;