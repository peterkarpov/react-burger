import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { SET_ID_FOR_POPUP } from "../../services/actions/basic";
import { useAppDispatch } from "../../utils/hooks";
import { HomePage } from "./Home";
import { IngredientPage } from "./IngredientPage";


function HomeOrIngredientPage() {

    const { id } = useParams<any>();

    const dispatch = useAppDispatch();

    useEffect(() => {

        dispatch({
            type: SET_ID_FOR_POPUP,
            idForPopup: id
        });

    }, [dispatch, id]);

    const history = useHistory<any>();

    const isFromHome = history.location?.state?.from?.pathname === '/' && history.action !== 'POP';

    if (isFromHome) {
        return (
            <HomePage />
        );
    } else {
        return (
            <IngredientPage />
        );
    }

}

export default HomeOrIngredientPage