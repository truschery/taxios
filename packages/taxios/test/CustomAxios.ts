
import {TAxios} from "../src/TAxios";
import {TMiddlewareRegister} from "../src/app/middlewares/interface";


export class CustomAxios extends TAxios {

    constructor() {
        super({
            baseURL: 'https://jsonplaceholder.typicode.com',
        })
    }


    onRequestSuccess(response): any {
        return response
    }

    middlewares(): TMiddlewareRegister {
        return {
            'request:before': []
        }
    }


    // registerMiddlewares(){
    //     return {
    //         'request:config:success': (ctx) => {
    //             console.log(ctx)
    //         }
    //     }
    // }

}