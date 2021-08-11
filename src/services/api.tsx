const DATA_URL = 'https://norma.nomoreparties.space/api/ingredients';
const DATA_URL_CHECKOUT = 'https://norma.nomoreparties.space/api/orders';

export const getDataRequest = (url: string = '') => {

    return fetch(url || DATA_URL)
        .then(result => {
            if (result.ok) {
                return result.json();
            }
            return Promise.reject(`Ошибка ${result.status}`);
        })
        .then(
            (result) => {

                if (result && result.success) {

                    return result.data;

                } else {
                    console.log(result);
                }

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

export const setOrderInfoRequest = (orderData: any) => {

    return fetch(DATA_URL_CHECKOUT, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ingredients: orderData.selectedIngredientsId
        })
    })
        .then(result => {
            if (result.ok) {
                return result.json();
            }
            return Promise.reject(`Ошибка ${result.status}`);
        })
        .then(
            (result) => {

                if (result && result.success) {

                    orderData = {
                        orderNumber: result.order.number,
                        selectedIngredientsId: orderData.selectedIngredientsId,
                        total: orderData.total
                    }

                    return orderData;

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

};