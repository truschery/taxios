import {TBaseHandler} from "./TBaseHandler";


type TTHandlerFn = (ctx: any) => void

interface ITHandler {
    handlers?: Map<string, TTHandlerFn>;
    addHandler: (name: string, fn: TTHandlerFn) => void;
    removeHandler: (name) => void;
    updateHandler: (name: string, fn: TTHandlerFn) => void;
    getHandler: (name: string, cxt: any) => void;
    runHandler: (name: string, cxt: any) => void;

}

export class THandler implements ITHandler{

    handlers: Map<string, TTHandlerFn> = new Map()

    addHandler(name: string, fn: TTHandlerFn) {
        if(this.handlers.get(name)){
            // Todo: what i need return?
            return false
        }

        this.handlers.set(name, fn)
    }

    removeHandler(){

    }

    updateHandler(){

    }

    runHandler(name: string, ctx: any) {
        const handler = this.handlers.get(name)

        try {
            if(handler){
                return handler(ctx)
            }
        }catch (e){
            throw new Error(`Handler ${name} failed: ${e.message}`);
        }
    }

    runHandlers(ctx) {
        if(this.handlers.size < 0) return ctx

        this.handlers.forEach((handler, name) => {

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
        return this.handlers.get(name)
    }

}