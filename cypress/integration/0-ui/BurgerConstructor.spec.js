require('@4tw/cypress-drag-drop')

describe('BurgerConstructor page display correctly', function () {
  before(function () {
    cy.visit('http://localhost:3000');
    cy.wait(2 * 1000);

  });

  var asd11 = null;
  var asd22 = null;

  it('drag-and-drop', () => {

    // перетаскиваем 3 элемента, 1 булка и 2 ингридиента
    cy.get('ul[class^="BurgerIngredients_ingredients-list"] > :nth-child(1) > div').drag('[class^="BurgerConstructor_burger-constructor"]');
    cy.get('ul[class^="BurgerIngredients_ingredients-list"] > :nth-child(3) > div').drag('[class^="BurgerConstructor_burger-constructor"]');
    cy.get('ul[class^="BurgerIngredients_ingredients-list"] > :nth-child(4) > div').drag('[class^="BurgerConstructor_burger-constructor"]');

    // сохраняем текст первого элемента из списка
    let textBefore = null;
    cy.get('[class^="BurgerConstructor_burger-constructor"] > ul[class^="scrollable_scrollable"] > :nth-child(1)').invoke('text').then((text) => {
      textBefore = text;
    });

    // перетаскиваем 2 ингридиент на место 1
    cy.get('[class^="BurgerConstructor_burger-constructor"] > ul[class^="scrollable_scrollable"] > :nth-child(2)')
      .drag('[class^="BurgerConstructor_burger-constructor"] > ul[class^="scrollable_scrollable"] > :nth-child(1)');

    // проверяем, что изменился текст первого элемента из списка
    cy.get('[class^="BurgerConstructor_burger-constructor"] > ul[class^="scrollable_scrollable"] > :nth-child(1)').invoke('text').then((text) => {
      expect(textBefore).to.not.equal(text);
    });

    // проверяем, что не изменился текст второго элемента из списка
    cy.get('[class^="BurgerConstructor_burger-constructor"] > ul[class^="scrollable_scrollable"] > :nth-child(2)').invoke('text').then((text) => {
      expect(textBefore).to.equal(text);
    });

    // проверяем, что список ингридиентов не пуст
    cy.get('div[class^="BurgerConstructor_burger-constructor"]').should('contain', 'булка');

    // проверяем, что верхний список содержит ингридиент
    cy.get('ul[class^="BurgerConstructor_top"]').should((item) => {
      expect(item).to.have.length(1);
    });

    // проверяем, что нижний список содержит ингридиент
    cy.get('ul[class^="BurgerConstructor_bottom"]').should((item) => {
      expect(item).to.have.length(1);
    });

    //// Don't work
    //let draggable = Cypress.$('ul[class^="BurgerIngredients_ingredients-list"] > :nth-child(1) > div')[0];  // Pick up this
    //let droppable = Cypress.$('[class^="BurgerConstructor_burger-constructor"]')[0];  // Drop over this
    // const coords = droppable.getBoundingClientRect();
    // draggable = cy.get(draggable);
    // droppable = cy.get(droppable);
    // draggable.trigger('mousedown');
    // draggable.trigger('mousemove', { clientX: coords.x + 130, clientY: coords.y + 150 });
    // draggable.trigger('mouseup');

    //// Don't work
    // draggable.dispatchEvent(new MouseEvent('mousedown'));
    // draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 0 }));
    // const coords = droppable.getBoundingClientRect();
    // draggable.dispatchEvent(new MouseEvent('mousemove', {
    //   //810x310
    //   clientX: coords.x + 130,
    //   clientY: coords.y + 150  // A few extra pixels to get the ordering right
    // }));
    // draggable.dispatchEvent(new MouseEvent('mouseup'));

  });

});
