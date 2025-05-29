import axios, {AxiosStatic, AxiosRequestConfig} from 'axios'


export type Axios = AxiosStatic | axios.AxiosStatic | axios

export interface ITAxios {
    axios: Axios;

    get: (url: string, params?: ITAxiosOptions) => Promise<any>;
    post: (url: string, data?: any, config?: ITAxiosOptions) => Promise<any>;
    put: (url: string, data?: any, config?: any) => Promise<any>;
    delete: (url: string, params?: any, config?: any) => Promise<any>;
}

export interface ITAxiosOptions extends AxiosRequestConfig {

}



export type TAxiosMethods = 'get' | 'post' | 'put' | 'delete'

export interface ITAxiosRequest {
    method: TAxiosMethods,
    url: string,

    params?: any,
    config?: any,
}

