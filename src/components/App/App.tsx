import React from 'react';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

//import json from '../../utils/data.json';

import { actionInitData, actionSetOrderInfo, SET_SELECTED_INGREDIENTS, SET_ID_FOR_POPUP, DELETE_ID_FOR_POPUP } from '../../services/actions/basic';

import IDataItem from '../../utils/Interfaces/IDataItem';

import Modal from '../Modal/Modal';

import OrderDetails from '../OrderDetails/OrderDetails';

//import { BurgerConstructorContext } from '../../services/BurgerConstructorContext';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

//const DATA_URL = 'https://norma.nomoreparties.space/api/ingredients';
//const DATA_URL_CHECKOUT = 'https://norma.nomoreparties.space/api/orders';

function App() {

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

    actionInitData()(dispatch);

  }, [dispatch]);

  const addIngredient = (id: any) => {

    let newSelectedIngredientsId = Array.from(selectedIngredientsId);

    let chosenIngredient = data.find((v: IDataItem) => v._id === id);

    if (chosenIngredient?.type === 'bun') {

      newSelectedIngredientsId = newSelectedIngredientsId.filter((v, i, a) => {
        return data.find((x: IDataItem) => x._id === v)?.type !== 'bun';
      });

      newSelectedIngredientsId.push(id);
      newSelectedIngredientsId.push(id);

    } else {
      newSelectedIngredientsId.push(id);
    }

    dispatch({
      type: SET_ID_FOR_POPUP,
      idForPopup: id
    });
    //setSelectedIngredientsId(newSelectedIngredientsId); // TODO будет переделано на DnD
  };

  const removeIngredient = (id: any) => {

    let newSelectedIngredientsId = selectedIngredientsId;
    let index = selectedIngredientsId.indexOf(id);
    selectedIngredientsId.splice(index, 1);

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

  const clearIdForPopup = () => {
    dispatch({
      type: DELETE_ID_FOR_POPUP,
    });
  }

  const setOrderInfo = (orderData: any) => {
    actionSetOrderInfo(orderData)(dispatch);
  }

  const clearOrderInfo = () => {

    let defaultIngredients = [];

    let defaultBunIngredientId = data.filter((v: IDataItem) => { return v.type === 'bun' })[0]._id;

    defaultIngredients.push(defaultBunIngredientId);
    defaultIngredients.push(defaultBunIngredientId);

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
      <AppHeader />

      <section className="main">
        <div className="wrapper" style={mainWrapperStyle}>

          <DndProvider backend={HTML5Backend}>


            {Array.from(data).length > 0
              ? <BurgerIngredients
                data={data}
                setIdForPopup={setIdForPopup}
                quantityData={state.quantityData}
                addIngredient={addIngredient}
              ></BurgerIngredients>
              : null}

            {Array.from(data).length > 0
              ? <BurgerConstructor
                data={data}
                completeCheckout={setOrderInfo}
                removeIngredient={removeIngredient}
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
          <IngredientDetails element={getIngredientById(idForPopup)}></IngredientDetails>
        </Modal>
      }
    </>
  );
}

export default App;
