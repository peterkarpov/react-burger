import ProfileOrdersListItem from "../ProfileOrdersListItem/ProfileOrdersListItem";
import stylesScrollable from '../../css/scrollable.module.css';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actionInitData } from "../../services/actions/basic";


function ProfileOrders() {

    const { data } = useSelector<any, any>(state => state.basic);

    const profileOrders = useSelector<any, any>(state => state.profileOrders);

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(actionInitData());

        return () => {

        }

    }, [dispatch]);
    
    const history = useHistory();

    const onClickProfileOrderItem = (item: any) => {
        history.replace({ pathname: `/profile/orders/${item.number}`, state: { from: history.location, number: item.number } });
    }

    return (
        <>
            <ul className={`profile-order-list ${stylesScrollable.scrollable} pr-2`} style={{ maxHeight: "60vh" }}>

                {Array.from(profileOrders.orders).map((item: any) => {

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