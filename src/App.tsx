import React from 'react';

import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';
import IngredientInfo from './components/IngredientInfo/IngridientInfo';

import json from './utils/data.json';

import IDataItem from './components/Interfaces/IDataItem';

class App extends React.Component<{}, { data: IDataItem[], idForPopup: any, selectedIngredientsId: string[] }> {

  constructor(props: any) {

    super(props);

    this.state = {
      data: json,
      idForPopup: null,
      selectedIngredientsId: []
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

    let selectedIngredientsId = Array.from(this.state.selectedIngredientsId);
    let alreadyExist = selectedIngredientsId.includes(id);
    selectedIngredientsId.push(id);

    if (alreadyExist) {
      this.setState({ ...this.state, selectedIngredientsId: selectedIngredientsId });
    } else {
      this.setState({ ...this.state, selectedIngredientsId: selectedIngredientsId, idForPopup: id });
    }

  };

  removeIngredient = (id: any) => {

    let selectedIngredientsId = this.state.selectedIngredientsId;
    let index = this.state.selectedIngredientsId.indexOf(id);
    selectedIngredientsId.splice(index, 1);

    this.setState({ ...this.state, selectedIngredientsId: selectedIngredientsId });
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
