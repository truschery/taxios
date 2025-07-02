import {AxiosRequestConfig} from "axios";
import AxiosInstance from './AxiosInstance'
import { IAxiosInstanceConfig, IRequestParams } from "./types";


export default class HttpClient extends AxiosInstance {
    constructor(options: IAxiosInstanceConfig) {
        super(options);
    }

    get(url: string, data?: any, config?: any) {
        return this.request({
            method: "get",
            url,
            params: { 
                params: data,
                ...config
            },
        })
    }

    post(url: string, data?: any, config?: any) {
        return this.request({
            method: "post",
            url,
            params: data,
            config,
        })
    }

    put(url: string, data?: any, config?: any) {
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
            params: config,
        })
    }


    onRequestSuccess(response: any){
        return response
    }

    onRequestError(error: any){
        return error
    }


    private async request(options: IRequestParams) {
        const { method, url, params = {}, config = {} } = options

        try {
            const response = await this.axios[method](url, params, config)

            return this.onRequestSuccess(response)
        }catch (error) {
            return this.onRequestError(error)
        }
    }
}