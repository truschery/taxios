import {THttpClient} from "./app/http-client";
import {THandler} from "./app/handlers/THandler";


/** Базовый класс который позволяет напрямую управлять axios настройками, запросами и тд
 * 
 * 
 * 
 * 
 */ 


export class TAxios extends THttpClient{

    constructor(options: any) {
        super(options);
    }


}


