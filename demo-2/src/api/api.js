import Api from './apiExport'
export default class ApiMethod{
    static searchRepositories(params){
        return Api._Get({
            url:"search/repositories",
            params
        })
    }
    static getUserInfo(urlSrc){
        return Api._Get({
            url:`users/${urlSrc}`,
        })
    }
}