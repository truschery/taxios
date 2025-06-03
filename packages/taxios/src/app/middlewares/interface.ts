

export type TMiddlewareFn = (ctx: any) => any

export type TMiddlewareEvents = 'request:success'
    | 'request:error'
    | 'response:success'
    | 'response:error'

export interface IMiddlewareRegister {
    [key: TMiddlewareEvents]: TMiddlewareFn | TMiddlewareFn[]
}