import IDataItem from './IDataItem';

export interface IBurgerIngredientsProps {
    data: IDataItem[],
    setIdForPopup: (id: string) => void,
    quantityData: { id: string, quantity: number }[]
};