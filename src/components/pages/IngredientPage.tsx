import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { actionInitData } from '../../services/actions/basic';
import { useEffect } from 'react';
import { RootState } from '../../utils/types';
import IBasicState from '../../utils/Interfaces/IBasicState';

export function IngredientPage() {

    const { id } = useParams<any>();

    const { data } = useSelector<RootState, IBasicState>(state => state.basic);

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(actionInitData())

    }, [dispatch]);

    const getIngredientById = (id: string) => {
        return data.find((v: any) => { return v._id === id });
    }

    const mainWrapperStyle = {
        display: 'flex',
        gap: 'calc(var(--offset-base-size) * 10)',
        justifyContent: 'space-evenly',

        width: 'calc(var(--offset-base-size) * 320)',
        marginLeft: 'auto',
        marginRight: 'auto',

        'flex-direction': 'column',
        'flex-wrap': 'nowrap',
        alignItems: 'center',
    };

    const ingredient = getIngredientById(id);

    // if (!ingredient) {
    //     history.replace({ pathname: '/', state });
    // }

    return (
        <section className="main">
            <div className="wrapper" style={mainWrapperStyle}>

                {ingredient
                    ?
                    <>
                        <span data-id={id} className={" text text_type_main-large mt-10"}>
                            Детали ингредиента
                        </span>
                        <IngredientDetails style={{ backgroundColor: 'transparent' }} element={ingredient}></IngredientDetails>
                    </>
                    :
                    <div>Ингредиент не найден по id: {id}</div>
                }

            </div>
        </section>
    );
}

