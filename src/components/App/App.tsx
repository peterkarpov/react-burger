import React from 'react';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

import json from '../../utils/data.json';

import IDataItem from '../Interfaces/IDataItem';

import Modal from '../Modal/Modal';

import OrderDetails from '../OrderDetails/OrderDetails';

import { BurgerConstructorContext } from '../../services/BurgerConstructorContext';

const DATA_URL = 'https://norma.nomoreparties.space/api/ingredients';
const DATA_URL_CHECKOUT = 'https://norma.nomoreparties.space/api/orders';

class App extends React.Component<{}, { data: IDataItem[], idForPopup: any, selectedIngredientsId: string[], quantityData: { id: string, quantity: number }[], orderInfo: any }> {

  constructor(props: any) {

    super(props);

    this.state = {
      data: json,
      idForPopup: null,
      selectedIngredientsId: (() => {

        const result = Array.from<string>([]);

        const defaultBunIngredientId = Array.from(json).filter((v: IDataItem) => { return v.type === 'bun' })[0]._id;
        result.push(defaultBunIngredientId);
        result.push(defaultBunIngredientId);

        return result;

      })(),
      quantityData: Array.from(json).map((v: IDataItem) => {
        return {
          id: v._id,
          quantity: Math.floor(Math.random() * 10)
        };
      }),
      orderInfo: null,
    };

    this.setIdForPopup = this.setIdForPopup.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
  }

  componentDidMount() {
    fetch(DATA_URL)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(
        (result) => {

          const defaultSelectedIngredientsId = Array.from<string>([]);

          //let defaultBunIngredientId = result.data.filter((v: IDataItem) => { return v.type === 'bun' })[0]._id;
          //defaultSelectedIngredientsId.push(defaultBunIngredientId);
          //defaultSelectedIngredientsId.push(defaultBunIngredientId);

          this.setState({ ...this.state, data: Array.from(result.data), selectedIngredientsId: defaultSelectedIngredientsId });
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          console.log(error);
          this.setState({ ...this.state, data: json });
        }
      )
      .catch((error) => {
        console.log(error);
      });
  }

  addIngredient = (id: any) => {

    // if (this.state.quantityData.find((v) => { return v.id === id })?.quantity === 0) {
    //   this.setState({ ...this.state, idForPopup: id });
    //   return;
    // }

    let newQuantityData = this.state.quantityData.map((v) => {

      if (v.id === id) {
        v.quantity = v.quantity - 1;
      }

      return v;
    });

    let selectedIngredientsId = Array.from(this.state.selectedIngredientsId);

    let chosenIngredient = this.state.data.find((v) => v._id === id);

    if (chosenIngredient?.type === 'bun') {

      selectedIngredientsId = selectedIngredientsId.filter((v, i, a) => {
        return this.state.data.find((x) => x._id === v)?.type !== 'bun';
      });

      selectedIngredientsId.push(id);
      selectedIngredientsId.push(id);

    } else {
      selectedIngredientsId.push(id);
    }

    this.setState({ ...this.state, selectedIngredientsId: selectedIngredientsId, quantityData: newQuantityData, idForPopup: id });

  };

  removeIngredient = (id: any) => {

    let newQuantityData = this.state.quantityData.map((v) => {

      if (v.id === id) {
        v.quantity = v.quantity + 1;
      }

      return v;
    });

    let selectedIngredientsId = this.state.selectedIngredientsId;
    let index = this.state.selectedIngredientsId.indexOf(id);
    selectedIngredientsId.splice(index, 1);

    this.setState({ ...this.state, selectedIngredientsId: selectedIngredientsId, quantityData: newQuantityData });
  };

  setIdForPopup = (id: any) => {
    this.setState({ ...this.state, idForPopup: id });
  };

  getIngredientById = (id: string) => {
    return this.state.data.find((v: any) => { return v._id === id });
  }

  clearIdForPopup = () => {
    this.setState({ ...this.state, idForPopup: null });
  }

  setOrderInfo = (orderData: any) => {

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

            this.setState({ ...this.state, orderInfo: orderData });

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

  clearOrderInfo = () => {

    let defaultIngredients = [];

    let defaultBunIngredientId = this.state.data.filter((v: IDataItem) => { return v.type === 'bun' })[0]._id;

    defaultIngredients.push(defaultBunIngredientId);
    defaultIngredients.push(defaultBunIngredientId);

    this.setState({ ...this.state, orderInfo: null, selectedIngredientsId: defaultIngredients });
  }

  mainWrapperStyle = {
    display: 'flex',
    gap: 'calc(var(--offset-base-size) * 10)',
    justifyContent: 'space-evenly',

    width: 'calc(var(--offset-base-size) * 320)',
    marginLeft: 'auto',
    marginRight: 'auto'
  };

  render() {

    return (
      <>
        <AppHeader />

        <section className="main">
          <div className="wrapper" style={this.mainWrapperStyle}>

            <BurgerConstructorContext.Provider value={{ 
              selectedIngredientsId: this.state.selectedIngredientsId, 
              removeIngredient: this.removeIngredient, 
              addIngredient: this.addIngredient 
              }}>

              <BurgerIngredients
                data={this.state.data}
                setIdForPopup={this.setIdForPopup}
                quantityData={this.state.quantityData}
              ></BurgerIngredients>

              <BurgerConstructor
                data={this.state.data}
                completeCheckout={this.setOrderInfo}
              ></BurgerConstructor>

            </BurgerConstructorContext.Provider>

          </div>
        </section>

        {this.state.orderInfo != null ?
          <Modal title={null} onCloseModalCallback={this.clearOrderInfo}>
            <OrderDetails orderInfo={this.state.orderInfo}></OrderDetails>
          </Modal>
          : null}

        {this.state.idForPopup != null ?
          <Modal title={'Детали ингридиента'} onCloseModalCallback={this.clearIdForPopup}>
            <IngredientDetails element={this.getIngredientById(this.state.idForPopup)}></IngredientDetails>
          </Modal>
          : null}
      </>
    );
  }
}

export default App;
