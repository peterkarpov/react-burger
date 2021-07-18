import React from 'react';

import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';
import IngredientInfo from './components/IngredientInfo/IngridientInfo';

import json from './utils/data.json';

import IDataItem from './components/Interfaces/IDataItem';

class App extends React.Component<{}, { data: IDataItem[], idForPopup: any, selectedIngredientsId: string[], quantityData: { id: string, quantity: number }[] }> {

  constructor(props: any) {

    super(props);

    this.state = {
      data: json,
      idForPopup: null,
      selectedIngredientsId: [],
      quantityData: Array.from(json).map((v: IDataItem) => {
        return {
          id: v._id,
          quantity: Math.floor(Math.random() * 10)
        };
      })
    };

    this.state.selectedIngredientsId.push(this.state.data.filter((v: IDataItem) => { return v.type === 'bun' })[0]._id);

    this.setIdForPopup = this.setIdForPopup.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
  }

  mainWrapperStyle = {
    display: 'flex',
    gap: 'calc(var(--offset-base-size) * 10)',
    justifyContent: 'space-evenly'
  };

  addIngredient = (id: any) => {

    if (this.state.quantityData.find((v) => { return v.id === id })?.quantity === 0) {
      this.setState({ ...this.state, idForPopup: id });
      return;
    }

    let newQuantityData = this.state.quantityData.map((v) => {

      if (v.id === id) {
        v.quantity = v.quantity - 1;
      }

      return v;
    });

    let selectedIngredientsId = Array.from(this.state.selectedIngredientsId);
    let alreadyExist = selectedIngredientsId.includes(id);
    selectedIngredientsId.push(id);

    if (alreadyExist) {
      this.setState({ ...this.state, selectedIngredientsId: selectedIngredientsId, quantityData: newQuantityData });
    } else {
      this.setState({ ...this.state, selectedIngredientsId: selectedIngredientsId, quantityData: newQuantityData, idForPopup: id });
    }

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

  getElementForPopup = () => {
    return this.state.data.find((v: any) => { return v._id === this.state.idForPopup });
  }

  clearPopup = (e: Event) => {

    e.stopPropagation();

    this.setState({ ...this.state, idForPopup: null });
  }

  render() {

    return (
      <>
        <AppHeader />

        <section className="main">
          <div className="wrapper" style={this.mainWrapperStyle}>

            <BurgerIngredients
              data={this.state.data}
              selectedIngredientsId={this.state.selectedIngredientsId}
              setIdForPopup={this.setIdForPopup}
              addIngredient={this.addIngredient}
              quantityData={this.state.quantityData}
            ></BurgerIngredients>

            <BurgerConstructor
              data={this.state.data}
              selectedIngredientsId={this.state.selectedIngredientsId}
              removeIngredient={this.removeIngredient}
            ></BurgerConstructor>

          </div>
        </section>

        {this.state.idForPopup !== null ?
          <IngredientInfo element={this.getElementForPopup()} clearPopup={this.clearPopup}></IngredientInfo>
          : null}
      </>
    );
  }
}

export default App;
