import {TBaseHandler} from "./TBaseHandler";
import {THandler} from "./THandler";


class TSuccessHandler extends THandler {

    constructor() {
        super()


        this.addHandler("taxios-request:success", (ctx) => {
            console.log(ctx)

            return ctx
        })

    }

}