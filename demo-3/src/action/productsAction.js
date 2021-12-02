import Api from '../api/api'
export const getProductsInfo=()=>{
    return async (dispatch)=>{
        return Api.getProductsInfo().then(res=>{
            if(res){
                global.PRODUCTS=res.products;
                dispatch({
                    type:"PRODUCTS",
                    data:res.products
                } )
            }
        }).catch(err=>{
            return []
        })
    }
}


