import Api from './apiExport'
export default class ApiMethod {
    static getProductsInfo() {
        return Api._Get({
            url: 'https://react-shopping-cart-67954.firebaseio.com/products.json',
        }
        )
    }
}