import IDataItem from './IDataItem';

export interface IBurgerIngredientsProps {
    setIdForPopup: (id: string) => void,
    quantityData: { id: string, quantity: number }[],
    onClickOnIngredient: (id: string) => void
};