

export type TMiddlewareFn = (ctx: any) => any

export interface IMiddlewareClass {
    name?: string,
    onRequestBefore?: (ctx: any) => any;
    onRequestAfter?: (ctx: any) => any;
    onResponseSuccess?: (ctx: any) => any;
    onResponseError?: (ctx: any) => any;
}

export interface IMiddlewareClassConstructor {
    new (): IMiddlewareClass
}

export interface IMiddleware {
    name: string
}

export type TMiddlewareEvents = 'request:before'
    | 'request:error'
    | 'response:success'
    | 'response:error'

export type TMiddlewareRegister = {
    [TMiddlewareEvent in TMiddlewareEvents]?: IMiddlewareClassConstructor[]
}


export const isMiddlewareClass = (obj: IMiddlewareClass) => {
    return  'onResponseSuccess' in obj ||
            'onResponseError' in obj   ||
            'onRequestBefore' in obj   ||
            'onRequestAfter' in obj
}