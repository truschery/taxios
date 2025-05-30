import {ITAxios, ITAxiosOptions, ITAxiosRequest} from "./interface";
import axios from "axios"

export class TAxios implements ITAxios {

    axios = null

    constructor(options: ITAxiosOptions) {

        this.axios = axios.create({
            ...options
        })
    }

    get(url: string, data?: any, config?: ITAxiosOptions) {
        return this.request({
            method: "get",
            url,
            params: data,
            config,
        })
    }

    post(url: string, data?: any, config?: ITAxiosOptions) {
        return this.request({
            method: "post",
            url,
            params: data,
            config,
        })
    }

    put(url: string, data?: any, config?: ITAxiosOptions) {
        return this.request({
            method: "put",
            url,
            params: data,
            config,
        })
    }

    delete(url: string, config?: any) {
        return this.request({
            method: "delete",
            url,
            config,
        })
    }

    private request(options: ITAxiosRequest) {
        const { method, url, params, config } = options

        return this.axios[method](url, params, config).then(response => {
            return response
        }).catch(e => {

        })
    }

}

