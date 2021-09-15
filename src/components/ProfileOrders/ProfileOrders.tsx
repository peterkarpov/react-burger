import ProfileOrdersListItem from "../ProfileOrdersListItem/ProfileOrdersListItem";
import stylesScrollable from '../../css/scrollable.module.css';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actionInitData } from "../../services/actions/basic";
import { RootState } from "../../utils/types";
import IBasicState from "../../utils/Interfaces/IBasicState";
import { IInitialState, IWsOrder } from "../../services/reducers/wsReducer";

function ProfileOrders() {

    const { data } = useSelector<RootState, IBasicState>(state => state.basic);

    const profileOrders = useSelector<RootState, IInitialState>(state => state.profileOrders);

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(actionInitData());

        return () => {

        }

    }, [dispatch]);
    
    const history = useHistory();

    const onClickProfileOrderItem = (item: IWsOrder) => {
        history.replace({ pathname: `/profile/orders/${item.number}`, state: { from: history.location, number: item.number } });
    }

    return (
        <>
            <ul className={`profile-order-list ${stylesScrollable.scrollable} pr-2`} style={{ maxHeight: "60vh" }}>

                {Array.from(profileOrders.orders).map((item: IWsOrder) => {

                    return (
                        <li
                            key={item._id}
                            className={""}
                            onClick={() => onClickProfileOrderItem(item)}
                            style={{ cursor: "pointer" }}
                        >
                            <ProfileOrdersListItem item={item} data={data} isShowStatus={true} />

                        </li>
                    )
                })}

            </ul>

            {profileOrders && profileOrders.orders.length === 0 ?
                <div className={"text text_type_main-default"} style={{ textAlign: 'center' }}>
                    У Вас ещё нет заказов
                </div>
                : null}
        </>
    );
}

export default ProfileOrders;