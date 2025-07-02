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

    onRequestBefore?: (config: AxiosRequestConfig, ctx?: any) => AxiosRequestConfig;
    onRequestAfter?: (config: AxiosRequestConfig, ctx?: any) => AxiosRequestConfig;
    onResponseSuccess?: (response: any, ctx?: any) => any;
    onResponseError?: (error: any, ctx?: any) => any;
    onError?: (error: any, ctx: any) => Promise<any>;
    
}



export interface IMiddlewareHandler {
    handler: TMiddleware;
    priority: number;
    type: string;
    id: string;
    context?: any;
}



export interface IBaseMiddlewareConfig {

}

// =============================================
