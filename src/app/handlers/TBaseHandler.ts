

type TMiddlewareFn = (ctx: any, next: any) => void

interface ITBaseHandler {
    middlewares: TMiddlewareFn[];
    use: (fn: TMiddlewareFn) => any
    apply: (ctx: any) => void
}


export class TBaseHandler implements ITBaseHandler{

    private readonly middlewares: TMiddlewareFn[] = []

    use(fn: TMiddlewareFn) {
        if(typeof fn !== 'function'){
            return new TypeError('Middleware must be a function')
        }

        this.middlewares.push(fn)

        return this
    }

    async apply(ctx){
        let index = -1

        const next = async () => {
            index++

            try {
                if(index < this.middlewares.length){
                    await this.middlewares[index](ctx, next);
                }
            }catch (e){
                throw new Error(`Middleware ${index} failed: ${e.message}`);
            }
        }


        try{
            await next()
            return this
        }catch (e){
            throw e
        }
    }

}