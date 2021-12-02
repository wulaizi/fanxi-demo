import Axios, { AxiosRequestConfig, AxiosResponse, AxiosPromise } from "axios";
let instance = Axios.create({
    baseURL: "https://api.github.com/",
    timeout: 20000,
    headers: { "Content-Type": "application/json" }
});
export function _Get({ url = "", params = {}}) {
    return new Promise((resolve, reject) => {
        instance.get(url, {
            params
        }).then((res) => {
            console.log(res)
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