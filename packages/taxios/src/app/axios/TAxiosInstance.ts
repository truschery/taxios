import axios, {AxiosRequestConfig} from "axios";
import {TMiddleware} from "../middlewares";




export class TAxiosInstance extends TMiddleware{
    axios = null

    constructor(options) {
        super();
        this.axios = axios.create({
            ...options
        })

        this.initialize()
    }


    private initialize() {
        this.axios.interceptors.request.use(config => {
            return this.run('request:success', config)
            //middleware request:success

            // console.log(config)

            return config
        }, error => {
            //middleware request:error
        })


        this.axios.interceptors.response.use(response => {
            return this.run('response:success', response)
        }, error => {
            //middleware response:error

            return Promise.reject(error)
        })
    }


}