import {IMiddlewareClass} from "../middlewares/interface";


export class AuthService implements IMiddlewareClass {


    onRequestBefore(ctx: any, next: any){

        console.log(234);
        

        next()
    };
    

    onResponseSuccess(ctx: any, next: any){

        console.log(222);
        

        next()
    }

}