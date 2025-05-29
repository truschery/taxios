import {TAxios} from "../src/TAxios";


export class CustomAxios extends TAxios {

    constructor() {
        super({
            baseURL: 'https://jsonplaceholder.typicode.com',
        })
    }

}