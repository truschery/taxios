import {IMiddlewareRegister, TMiddlewareFn} from "./interface";


export class TMiddleware {

    _middlewares: Map<string, TMiddlewareFn | TMiddlewareFn[]> = new Map()


    constructor() {
        this.registerMiddlewares()
    }

    middlewares(): IMiddlewareRegister {
        return {

        }
    }

    add(name: string, fn: TMiddlewareFn) {
        if(this._middlewares.get(name)){
            // Todo: what i need return?
            return false
        }

        this._middlewares.set(name, fn)
    }

    removeHandler(){

    }

    updateHandler(){

    }

    run(name: string, ctx: any) {
        const handlers = this._middlewares.get(name)

        if(handlers instanceof Array){

            handlers.forEach(handler => {

                handler(ctx)

            })

        }else if(typeof handlers === 'function'){
            return handlers(ctx)
        }
    }

    runAll(ctx) {
        if(this._middlewares.size < 0) return ctx

        this._middlewares.forEach((handler, name) => {

            try{
                if(typeof handler === 'function'){
                    handler(ctx)
                }
            }catch (e){
                console.log(e)
            }

        })


        return ctx
    }

    getHandler(name: string){
        return this._middlewares.get(name)
    }


    private registerMiddlewares() {
        const externalMiddlewares = this.middlewares()

        if(externalMiddlewares instanceof Object){

            for(let key in externalMiddlewares){
                this._middlewares.set(key, externalMiddlewares[key])
            }
        }
    }
}