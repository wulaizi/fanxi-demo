const iniState = {
    products: [],
    shopppingCarProducts:[],
    totalPrice:0,
    sortProducts:"Select"
};

export default function (state = iniState, action) {
    switch (action.type) {
        case "PRODUCTS":
            return { ...state, products: action.data }
        case "SHOPPING_CAR_PRODUCTS":
            return {...state,shopppingCarProducts:action.data}
        case "TOTAL_PRICE":
            return {...state,totalPrice:action.data}
        case "SORT_PRODUCTS":
            return {...state,sortProducts:action.data}
        default:
            return state;
    }
}