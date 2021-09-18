import { useParams } from 'react-router-dom';
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { actionInitData } from '../../services/actions/basic';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

export function IngredientPage() {

    const { id } = useParams<any>();

    const { data } = useAppSelector(state => state.basic);

    const dispatch = useAppDispatch();

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

