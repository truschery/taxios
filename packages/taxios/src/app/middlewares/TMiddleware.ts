import {
    TMiddlewareRegister,
    isMiddlewareClass,
    IMiddlewareClass,
    IMiddlewareClassConstructor,
    TMiddlewareEvents,
    TMiddlewareFn
} from "./interface";
import {AuthService} from "../services/AuthService";
import {TMiddlewareConfig} from "../config/middleware";
import {isClass} from "../validators";


export class TMiddleware {

    

    _middlewares: Map<TMiddlewareEvents, IMiddlewareClassConstructor[]> = new Map()
    _defaultMiddlewares: TMiddlewareRegister = {
        'request:before': [AuthService],
        'request:after': [],
        'response:success': [],
        'response:error': [],
    }

    config: TMiddlewareConfig

    constructor(config: TMiddlewareConfig) {
        this.config = config

        this._middlewares.set("request:before", [])
        this._middlewares.set("request:after", [])
        this._middlewares.set("response:success", [])
        this._middlewares.set("response:error", [])

        this.init()
    }



    middlewares(): TMiddlewareRegister {
        return {

        }
    }

    getMiddleware(name: TMiddlewareEvents){
        return this._middlewares.get(name)
    }

    run(name: TMiddlewareEvents, ctx: any) {
        const handlers = this.getMiddleware(name)

        if(!handlers || handlers.length < 0) return false

        let index = 0

        const next = () => {
            const handler = handlers[index]
            
        
            if(isClass(handler) && isMiddlewareClass(new handler())){
                
                const handlerClass = new handler()
                
                const eventSettings = {
                    'request:before': handlerClass.onRequestBefore,
                    'request:after': handlerClass.onRequestAfter,
                    'response:success': handlerClass.onResponseSuccess,
                    'response:error': handlerClass.onResponseError,
                }


                console.log(eventSettings);
                

                eventSettings[name] && eventSettings[name](ctx, next)
            }
        }

        next()
        //
        // if(handlers instanceof Array){
        //
        //     handlers.forEach(handler => {
        //
        //         handler(ctx)
        //
        //     })
        //
        // }else if(typeof handlers === 'function'){
        //     return handlers(ctx)
        // }
    }

    private init() {
        let externalMiddlewares = this.middlewares()

        if(this.config.useDefaultMiddlewares){
            this.registerMiddlewares(this._defaultMiddlewares)
        }

        this.registerMiddlewares(externalMiddlewares)
    }

    private registerMiddlewares(externalMiddlewares: TMiddlewareRegister) {
        for(let key in externalMiddlewares){
        
            const hasMiddlewareGroup = this.getMiddleware(key as TMiddlewareEvents)
            if(!hasMiddlewareGroup) return false

            const externalMiddlewareGroup = externalMiddlewares[key as TMiddlewareEvents]

            if(externalMiddlewareGroup && externalMiddlewareGroup?.length > 0){
                externalMiddlewareGroup.forEach(externalMiddleware => {

                    hasMiddlewareGroup.push(externalMiddleware)

                })
            }
        }
    }


}