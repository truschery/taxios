
import {TAxios} from "../src/TAxios";
import {IMiddlewareRegister} from "../src/app/middlewares/interface";


export class CustomAxios extends TAxios {

    constructor() {
        super({
            baseURL: 'https://jsonplaceholder.typicode.com',
        })
    }


    onRequestSuccess(response): any {
        return response
    }

    middlewares(): IMiddlewareRegister {
        return {
            'request:success': (config) => {

                console.log(config)

                return config
            },
            'response:success': (response) => {
                console.log(23)
            }
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