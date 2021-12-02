import Axios, { AxiosRequestConfig, AxiosResponse, AxiosPromise } from "axios";
let instance = Axios.create({
    baseURL: "http://vueshop.glbuys.com/api/",
    timeout: 20000,
    headers: { "Content-Type": "application/json" }
});
instance.interceptors.response.use((config) => {
    console.log("返回参数", config)
    return config;
})
export function _Get({ url = "", params = {} , token = false }) {
    return new Promise((resolve, reject) => {
        instance.get(url, {
            params
        }).then((res) => {
            if (res.data) {
                resolve(res.data);
            } else {
                reject(res.data);
            }
        }, err => {
            reject(err)
        })
    })
}
export default instance;