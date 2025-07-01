import axios, {AxiosRequestConfig} from "axios";
import {TMiddleware} from "../middlewares";
import {middleware} from "../config";




export class TAxiosInstance extends TMiddleware{
    axios = null

    constructor(options) {
        super(middleware);
        this.axios = axios.create({
            ...options
        })

        this.initialize()
    }


    private initialize() {
        this.axios.interceptors.request.use(config => {
            
            
            
            return super.run('request:before', config)
            //middleware request:success

            // console.log(config)

            return config
        }, error => {
            console.log(error);
            
            return this.run('request:error', error)
        })


        this.axios.interceptors.response.use(response => {
            return this.run('response:success', response)
        }, error => {
            //middleware response:error

            return Promise.reject(error)
        })
    }


}