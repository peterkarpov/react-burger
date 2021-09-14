import IDataItem from "./IDataItem";

export type TOrderInfo = {
    orderNumber: number | null,
    selectedIngredientsId: string[],
    total: number
}

export default interface IBasicState {
    data: IDataItem[],
    selectedIngredientsId: string[],
    idForPopup: string | null,
    orderInfo: TOrderInfo | null,
    orderStatus: 'ERROR' | 'IN_PROGRESS' | null,
}
