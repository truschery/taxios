import {TMiddlewareClass} from "../middlewares/interface";


export class AuthService implements TMiddlewareClass {

    onResponseSuccess(ctx){

        console.log(ctx)

        return ctx
    }

}