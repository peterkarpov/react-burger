import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import Modal from "../Modal/Modal";
import OrderInfo from "../OrderInfo/OrderInfo";
import { OrderInfoPage } from "./OrderInfoPage";

function ModalSwitchForOrderInfo(props: { route: string, children: React.ReactNode }) {

    const history = useHistory();
    const location = useLocation<any>();

    const background = (location.state && (history.action === 'PUSH' || history.action === 'REPLACE') && location.state.from) || null;

    const onModalClose = () => {
        history.replace({ pathname: `${props.route}`, state: { from: history.location } });
    }

    return (
        <>
            <Switch location={background || location}>
                <Route exact={true} path={`${props.route}`} >
                    {props.children}
                </Route>
                <Route exact={true} path={`${props.route}/:number`} >
                    <OrderInfoPage />
                </Route>
            </Switch>

            {background &&
                <Route path={`${props.route}/:number`}>
                    <Modal
                        // title={`#${location?.state?.number}`}
                        title={``}
                        onCloseModalCallback={onModalClose}
                    >
                        <OrderInfo />
                    </Modal>
                </Route>
            }
        </>
    )
}

export default ModalSwitchForOrderInfo;