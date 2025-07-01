import {AxiosRequestConfig} from "axios";
import {ITAxiosOptions, ITAxiosRequest} from "../../interface";
import {ITHttpClientConfig} from "./interface";
import {TAxiosInstance} from "../axios/index";


export class THttpClient extends TAxiosInstance{
    constructor(options: AxiosRequestConfig) {
        super(options);
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


    onRequestSuccess(response){
        return response
    }

    onRequestError(error){
        return error
    }


    private async request(options: ITAxiosRequest) {
        const { method, url, params, config } = options

        try {
            const response = await this.axios[method](url, params, config)

            return this.onRequestSuccess(response)
        }catch (error) {
            return this.onRequestError(error)
        }
    }

}