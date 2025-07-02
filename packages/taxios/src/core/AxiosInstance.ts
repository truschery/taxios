import axios from "axios";
import MiddlewareManager from "../middleware/MiddlewareManager";
import { IAxiosInstanceConfig, TMiddleware } from "./types";


export default class TAxiosInstance {
    axios
    config
    middlewareManager

    constructor(config: IAxiosInstanceConfig = {}) {

        this.axios = axios.create({
            ...config.axios
        })
    
        this.config = config
        this.middlewareManager = new MiddlewareManager() 

        this.setupDefaultMiddlewares()
        this.setupInterceptors()
    }

    setupDefaultMiddlewares(){

        if(this.config?.middleware?.auth){
            
        }

        // this.use((ctx: any) => {
        //     return ctx
        // }, 'response:success')

        // this.use((ctx: any) => {
        //     return ctx
        // }, 'response:error')
    }

    use(middleware: TMiddleware, types = 'request:before') {
        this.middlewareManager.add(middleware, types);
        this.refreshInterceptors();
        return this;
    }

    /**
   * Обновление interceptors
   */
    refreshInterceptors() {
        // Очистка существующих interceptors
        this.axios.interceptors.request.clear();
        this.axios.interceptors.response.clear();
        
        // Повторная настройка
        this.setupInterceptors();
    }


    private setupInterceptors() {

        this.middlewareManager.getExecutorMiddlewares('request:before').forEach(middleware => {
            this.axios.interceptors.request.use(middleware as any);
        });
 
        


        // this.axios.interceptors.response.use(response => {
        //     return response
        // }, error => {
        //     //middleware response:error

        //     return Promise.reject(error)
        // })
    }


}