import React from 'react';

import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

//import json from '../../utils/data.json';

import { actionInitData, actionSetOrderInfo, SET_SELECTED_INGREDIENTS, SET_ID_FOR_POPUP, DELETE_ID_FOR_POPUP, SET_ORDER_DATA } from '../../services/actions/basic';

import IDataItem from '../../utils/Interfaces/IDataItem';

import Modal from '../Modal/Modal';

import OrderDetails from '../OrderDetails/OrderDetails';

//import { BurgerConstructorContext } from '../../services/BurgerConstructorContext';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAuth } from '../../services/auth';
import { useHistory, useLocation } from 'react-router-dom';

//const DATA_URL = 'https://norma.nomoreparties.space/api/ingredients';
//const DATA_URL_CHECKOUT = 'https://norma.nomoreparties.space/api/orders';

export function HomePage() {

  const auth = useAuth();
  const history = useHistory();
  const location = useLocation<any>();

  const { data, selectedIngredientsId, orderInfo, idForPopup } = useSelector<any, any>(state => state.basic);

  const dispatch = useDispatch();

  const [state] = React.useState<{
    quantityData: {
      id: string,
      quantity: number
    }[],
  }>({
    quantityData: Array.from([]).map((v: IDataItem) => {
      return {
        id: v._id,
        quantity: Math.floor(Math.random() * 10)
      };
    }),
  });

  useEffect(() => {

    dispatch(actionInitData());

  }, [dispatch]);

  const openPopup = (id: any) => {

    // if (history.location.pathname === '/') {

    //   setIdForPopup(id);
    //   window.history.replaceState(null, `id:${id}`, `/ingredients/${id}`);

    // } else {

    //   history.replace({ pathname: `/ingredients/${id}`, state: {from: history.location} });
    // }

    history.replace({ pathname: `/ingredients/${id}`, state: { from: history.location } });
  }

  const clearIdForPopup = () => {
    dispatch({
      type: DELETE_ID_FOR_POPUP,
    });

    history.replace({ pathname: `/`, state: { from: history.location } });

    //window.history.replaceState(null, `react-burger`, `/`)
  }

  const addIngredient = (id: any) => {

    let newSelectedIngredientsId = Array.from(selectedIngredientsId);

    if (data.find((v: IDataItem) => v._id === id)?.type === 'bun') {

      newSelectedIngredientsId = newSelectedIngredientsId.filter((v, i, a) => {
        return data.find((x: IDataItem) => x._id === v)?.type !== 'bun';
      });

      newSelectedIngredientsId.push(id);
      newSelectedIngredientsId.push(id);

    } else {
      newSelectedIngredientsId.push(id);
    }

    dispatch({
      type: SET_SELECTED_INGREDIENTS,
      selectedIngredientsId: newSelectedIngredientsId
    });

  };

  const removeIngredient = (id: any) => {

    const newSelectedIngredientsId = selectedIngredientsId;
    const index = selectedIngredientsId.indexOf(id);
    newSelectedIngredientsId.splice(index, 1);

    dispatch({
      type: SET_SELECTED_INGREDIENTS,
      selectedIngredientsId: newSelectedIngredientsId
    });

  };

  const setIdForPopup = (id: any) => {
    dispatch({
      type: SET_ID_FOR_POPUP,
      idForPopup: id
    });
  };

  const getIngredientById = (id: string) => {
    return data.find((v: any) => { return v._id === id });
  }

  const setOrderInfo = (orderData: any) => {

    if (!auth.isHasCookie()) {

      history.replace({ pathname: '/login', state: { from: location } });

    } else {
      dispatch(actionSetOrderInfo(orderData));
    }

  }

  const clearOrderInfo = () => {

    dispatch({
      type: SET_ORDER_DATA,
      orderInfo: null
    });

    let defaultIngredients = Array.from<IDataItem>([]);

    //// demo
    // let defaultBunIngredientId = data.filter((v: IDataItem) => { return v.type === 'bun' })[0]._id;

    // defaultIngredients.push(defaultBunIngredientId);
    // defaultIngredients.push(defaultBunIngredientId);

    dispatch({
      type: SET_SELECTED_INGREDIENTS,
      selectedIngredientsId: defaultIngredients
    });

  }

  const mainWrapperStyle = {
    display: 'flex',
    gap: 'calc(var(--offset-base-size) * 10)',
    justifyContent: 'space-evenly',

    width: 'calc(var(--offset-base-size) * 320)',
    marginLeft: 'auto',
    marginRight: 'auto'
  };

  return (
    <>
      <section className="main">
        <div className="wrapper" style={mainWrapperStyle}>

          <DndProvider backend={HTML5Backend}>

            {Array.from(data).length > 0
              ? <BurgerIngredients
                setIdForPopup={setIdForPopup}
                quantityData={state.quantityData}
                onClickOnIngredient={openPopup}
              ></BurgerIngredients>
              : null}

            {Array.from(data).length > 0
              ? <BurgerConstructor
                completeCheckout={setOrderInfo}
                removeIngredient={removeIngredient}
                addIngredient={addIngredient}
              ></BurgerConstructor>
              : null}

          </DndProvider>

        </div>
      </section>

      {orderInfo &&
        <Modal title={null} onCloseModalCallback={clearOrderInfo}>
          <OrderDetails orderInfo={orderInfo}></OrderDetails>
        </Modal>
      }

      {idForPopup &&
        <Modal title={'Детали ингредиента'} onCloseModalCallback={clearIdForPopup}>
          <IngredientDetails style={undefined} element={getIngredientById(idForPopup)}></IngredientDetails>
        </Modal>
      }
    </>
  );
}

