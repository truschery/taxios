

export type TMiddlewareFn = (ctx: any) => any

export interface IMiddlewareClass {
    name?: string,
    onRequestBefore?: (ctx: any, next: () => void) => any;
    onRequestAfter?: (ctx: any, next: () => void) => any;
    onResponseSuccess?: (ctx: any, next: () => void) => any;
    onResponseError?: (ctx: any, next: () => void) => any;
}

export interface IMiddlewareClassConstructor {
    new (): IMiddlewareClass
}

export interface IMiddleware {
    name: string
}

export type TMiddlewareEvents = 'request:before'
    | 'request:after'
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