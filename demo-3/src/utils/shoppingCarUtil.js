import { reduxStore } from '../index'
import LocalStorageHelper from '../utils/localstorageHelper'
export default class shoppingCarUtil {
    static init (){
       let products= LocalStorageHelper.getItem("shoppingCar");
       products&&shoppingCarUtil.cache(products,false)
    }

    //获取商品
    static getShopppingCarProducts(){
        return [...reduxStore.getState().shoppingCar.shopppingCarProducts];
    }

    //存储数据
    static cache(data,isCache=true){
        if(isCache){
            LocalStorageHelper.setItem("shoppingCar",data)
        }
        reduxStore.dispatch({
            type: "SHOPPING_CAR_PRODUCTS",
            data
        })
    }

    

    //添加购物车
    static addToShoppingCar(item) {
        let shopppingCarProducts = shoppingCarUtil.getShopppingCarProducts();
        let hasItem = shopppingCarProducts.find(p => p.sku == item.sku);
        if (!hasItem) {
            shopppingCarProducts.push({ ...item, count: 1 })
            shoppingCarUtil.cache(shopppingCarProducts)
        } else {
            let count=hasItem.count;
            count++
            shoppingCarUtil.addCount(hasItem,count)
        }
    }
    //删除商品
    static delShoppingCarProducts = (item) => {
        let shopppingCarProducts = shoppingCarUtil.getShopppingCarProducts();
        shopppingCarProducts.map((p, index) => {
            if (p.sku == item?.sku) {
                shopppingCarProducts.splice(index, 1)
            }
        });
        shoppingCarUtil.cache(shopppingCarProducts)
    }
    //添加商品数量
    static addCount = (item, count) => {
        let shopppingCarProducts = shoppingCarUtil.getShopppingCarProducts();
        shopppingCarProducts.map((p, index) => {
            if (item.sku == p.sku) {
                shopppingCarProducts[index].count = count
            }
        })
        shoppingCarUtil.cache( shopppingCarProducts)
    }

    //计算商品总价
    static calculatePrice = () => {
        let shopppingCarProducts = shoppingCarUtil.getShopppingCarProducts();
        if (!shopppingCarProducts || shopppingCarProducts.length <= 0) return 0;
        let newArr = shopppingCarProducts.map(item => item.price * item.count);
        let total = newArr.reduce((curr, next) => curr + next);
        return total
    }

    //商品分期
    static installments = () => {
        let shopppingCarProducts =shoppingCarUtil.getShopppingCarProducts();
        if (!shopppingCarProducts || shopppingCarProducts.length <= 0) return {
            installments: 0,
            installmentsPrice: 0
        }
        let installments = shopppingCarProducts[0].installments;
        let installmentsPrice = shoppingCarUtil.calculatePrice() / installments
        return {
            installments,
            installmentsPrice
        }
    }

    //清空购物车
    static clear = () => {
        shoppingCarUtil.cache([])
        LocalStorageHelper.removeItem('shoppingCar')
    }

    //筛选
    static filterProducts = (selected = []) => {
        let products = global?.PRODUCTS ?? [];
        let filterProductsData = products.filter((item, index) => {
            let _index = selected.findIndex(p => item?.availableSizes.includes(p));
            return _index > -1;
        })
        let data = selected && selected.length ? filterProductsData : products
        let renderData=shoppingCarUtil.sortProducts(data)
        reduxStore.dispatch({
            type: "PRODUCTS",
            data:renderData
        })
    }

    //排序
    static sortProducts = (products = [],select) => {
        let sortSelect = select??reduxStore.getState().shoppingCar.sortProducts;
        if (sortSelect == "Select") {
            return products;
        }
        let data = products.sort((pre, next) => {
            if (sortSelect == "Lowest to highest") {
                return pre?.price - next?.price
            }
            return next?.price - pre?.price
        })
        if(select){
            reduxStore.dispatch({
                type: "PRODUCTS",
                data:[...data]
            })
        }
        return data;
    }

}