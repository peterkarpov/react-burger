export interface IBurgerConstructorContext {
    selectedIngredientsId: string[],
    removeIngredient: (id: string) => void
};