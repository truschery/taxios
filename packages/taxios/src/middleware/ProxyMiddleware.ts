import BaseMiddleware from "./BaseMiddleware";
import { HttpsProxyAgent } from 'https-proxy-agent';
import {AxiosRequestConfig} from "axios";
import getRandomFrom from "../utils/getRandomFrom";


interface IProxyConfig {
    proxies: string[]
}

export default class ProxyMiddleware extends BaseMiddleware{

    onRequestBefore(config: AxiosRequestConfig, ctx: IProxyConfig): AxiosRequestConfig<any> {

        const randomProxy = ctx.proxies[getRandomFrom(0, ctx.proxies.length - 1)];


        config.proxy = {
            protocol: 'http', // или 'https' в зависимости от прокси
            host: '67.43.228.250', // IP или хост прокси
            port: 14395,
        }
        // config.httpAgent = new HttpsProxyAgent(randomProxy)

        return config;
    }

}