import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation, useParams } from "react-router-dom";
import { actionInitData, DELETE_ID_FOR_POPUP, SET_ID_FOR_POPUP } from "../../services/actions/basic";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { HomePage } from "./Home";
import { IngredientPage } from "./IngredientPage";

function ModalSwitch() {

    const { id } = useParams<any>();

    const history = useHistory<any>();
    const location = useLocation<any>();

    const background = (location.state && (history.action === 'PUSH' || history.action === 'REPLACE') && location.state.from) || null;

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(actionInitData());
    
      }, [dispatch]);

    useEffect(() => {

        dispatch({
            type: SET_ID_FOR_POPUP,
            idForPopup: id
        });

        return () => {
            dispatch({
                type: DELETE_ID_FOR_POPUP,
            });
        };

    }, [dispatch, id]);

    const { data, idForPopup } = useSelector<any, any>(state => state.basic);

    const clearIdForPopup = () => {
        dispatch({
            type: DELETE_ID_FOR_POPUP,
        });

        history.replace({ pathname: `/`, state: { from: history.location } });
    }

    const getIngredientById = (id: string) => {
        return data.find((v: any) => { return v._id === id });
    }

    return (
        <>
            <Switch location={background || location}>
                <Route exact={true} path="/" >
                    <HomePage />
                </Route>
                <Route exact={true} path="/ingredients/:id" >
                    <IngredientPage />
                </Route>
            </Switch>

            {background &&
                <Route path="/ingredients/:id">

                    {idForPopup &&
                        <Modal title={'Детали ингредиента'} onCloseModalCallback={(clearIdForPopup)}>
                            <IngredientDetails style={undefined} element={getIngredientById(idForPopup)}></IngredientDetails>
                        </Modal>
                    }

                </Route>
            }
        </>
    )

}

export default ModalSwitch;