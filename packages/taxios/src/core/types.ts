import { AxiosRequestConfig } from "axios";


// ==========|AxiosInstance|====================
export interface IAxiosInstanceConfig {
    axios?: AxiosRequestConfig;
    middleware?: IAxiosInstanceConfigMiddleware; 
}


interface IAxiosInstanceConfigMiddleware {
    auth: boolean,
}



// =============================================

// ==========|HttpClient|====================

export type TRequestMethods = 'get' | 'post' | 'put' | 'delete' 

export interface IRequestParams {
    method: TRequestMethods;
    url: string;
    params: any;
    config?: any;

}



// =============================================



// ==========|MiddlewareManager|================

export type TMiddlewareManagerTypes = 'request:before' | 'request:after' | 'response:success' | 'response:error'

export type TMiddlewareFunction = (ctx: any) => any
export type TMiddleware = IMiddlewareClass | TMiddlewareFunction


export interface IMiddlewareClass {
    config?: IBaseMiddlewareConfig;
    priority: number;

    onRequestBefore?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    onRequestAfter?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    onResponseSuccess?: (ctx: any) => any;
    onResponseError?: (ctx: any) => any;
    onError?: (error: any) => Promise<any>;
    
}



export interface IMiddlewareHandler {
    handler: TMiddleware;
    priority: number;
    type: string;
    id: string;
}



export interface IBaseMiddlewareConfig {

}

// =============================================
