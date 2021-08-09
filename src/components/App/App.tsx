import React from 'react';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

//import json from '../../utils/data.json';

import IDataItem from '../../utils/Interfaces/IDataItem';

import Modal from '../Modal/Modal';

import OrderDetails from '../OrderDetails/OrderDetails';

import { BurgerConstructorContext } from '../../services/BurgerConstructorContext';
import { useEffect } from 'react';

const DATA_URL = 'https://norma.nomoreparties.space/api/ingredients';
const DATA_URL_CHECKOUT = 'https://norma.nomoreparties.space/api/orders';

function App() {

  const [data, setData] = React.useState<IDataItem[]>([]);
  const [selectedIngredientsId, setSelectedIngredientsId] = React.useState<string[]>([]);

  const [state, setState] = React.useState<{
    idForPopup: any,
    quantityData: {
      id: string,
      quantity: number
    }[],
    orderInfo: any
  }>({
    idForPopup: null,
    quantityData: Array.from([]).map((v: IDataItem) => {
      return {
        id: v._id,
        quantity: Math.floor(Math.random() * 10)
      };
    }),
    orderInfo: null,
  });

  useEffect(() => {

    const getDataRequest = (url: string) => {

      return fetch(url)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then(
          (result) => {

            // TODO default
            const defaultSelectedIngredientsId = Array.from<string>([]);
            let defaultBunIngredientId = result.data.filter((v: IDataItem) => { return v.type === 'bun' }).sort(() => Math.random() - 0.5).find(() => { return true })?._id;

            defaultSelectedIngredientsId.push(defaultBunIngredientId);
            defaultSelectedIngredientsId.push(defaultBunIngredientId);

            defaultSelectedIngredientsId.push(result.data.filter((v: IDataItem) => { return v.type !== 'bun' }).sort(() => Math.random() - 0.5).find(() => { return true })?._id);
            defaultSelectedIngredientsId.push(result.data.filter((v: IDataItem) => { return v.type !== 'bun' }).sort(() => Math.random() - 0.5).find(() => { return true })?._id);
            defaultSelectedIngredientsId.push(result.data.filter((v: IDataItem) => { return v.type !== 'bun' }).sort(() => Math.random() - 0.5).find(() => { return true })?._id);

            setSelectedIngredientsId(defaultSelectedIngredientsId);
            setData(result.data);
          },
          // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
          // чтобы не перехватывать исключения из ошибок в самих компонентах.
          (error) => {
            console.log(error);
          }
        )
        .catch((error) => {
          console.log(error);
        });

    };

    getDataRequest(DATA_URL);

  }, []);

  const addIngredient = (id: any) => {

    let newSelectedIngredientsId = Array.from(selectedIngredientsId);

    let chosenIngredient = data.find((v) => v._id === id);

    if (chosenIngredient?.type === 'bun') {

      newSelectedIngredientsId = newSelectedIngredientsId.filter((v, i, a) => {
        return data.find((x) => x._id === v)?.type !== 'bun';
      });

      newSelectedIngredientsId.push(id);
      newSelectedIngredientsId.push(id);

    } else {
      newSelectedIngredientsId.push(id);
    }

    setState({ ...state, idForPopup: id });
    //setSelectedIngredientsId(newSelectedIngredientsId); // TODO будет переделано на DnD
  };

  const removeIngredient = (id: any) => {

    let newSelectedIngredientsId = selectedIngredientsId;
    let index = selectedIngredientsId.indexOf(id);
    selectedIngredientsId.splice(index, 1);

    setSelectedIngredientsId(newSelectedIngredientsId);
  };

  const setIdForPopup = (id: any) => {
    setState({ ...state, idForPopup: id });
  };

  const getIngredientById = (id: string) => {
    return data.find((v: any) => { return v._id === id });
  }

  const clearIdForPopup = () => {
    setState({ ...state, idForPopup: null });
  }

  const setOrderInfo = (orderData: any) => {

    fetch(DATA_URL_CHECKOUT, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ingredients: orderData.selectedIngredientsId
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(
        (result) => {

          if (result && result.success) {

            orderData = {
              orderNumber: result.order.number,
              selectedIngredientsId: orderData.selectedIngredientsId,
              total: orderData.total
            }

            setState({ ...state, orderInfo: orderData });

          } else {
            console.log(result);
          }

        },
        (error) => {
          console.log(error);

        }
      )
      .catch((error) => {
        console.log(error);
      });

  }

  const clearOrderInfo = () => {

    let defaultIngredients = [];

    let defaultBunIngredientId = data.filter((v: IDataItem) => { return v.type === 'bun' })[0]._id;

    defaultIngredients.push(defaultBunIngredientId);
    defaultIngredients.push(defaultBunIngredientId);

    setSelectedIngredientsId(defaultIngredients);
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

          <BurgerConstructorContext.Provider value={{
            selectedIngredientsId: selectedIngredientsId,
            removeIngredient: removeIngredient,
            addIngredient: addIngredient
          }}>

            {data.length > 0
              ? <BurgerIngredients
                data={data}
                setIdForPopup={setIdForPopup}
                quantityData={state.quantityData}
              ></BurgerIngredients>
              : null}

            {data.length > 0
              ? <BurgerConstructor
                data={data}
                completeCheckout={setOrderInfo}
              ></BurgerConstructor>
              : null}

          </BurgerConstructorContext.Provider>

        </div>
      </section>

      {state.orderInfo != null ?
        <Modal title={null} onCloseModalCallback={clearOrderInfo}>
          <OrderDetails orderInfo={state.orderInfo}></OrderDetails>
        </Modal>
        : null}

      {state.idForPopup != null ?
        <Modal title={'Детали ингридиента'} onCloseModalCallback={clearIdForPopup}>
          <IngredientDetails element={getIngredientById(state.idForPopup)}></IngredientDetails>
        </Modal>
        : null}
    </>
  );
}

export default App;
