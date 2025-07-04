import BaseMiddleware from "./BaseMiddleware";
import { HttpsProxyAgent } from 'https-proxy-agent';
import {AxiosRequestConfig} from "axios";
import getRandomFrom from "../utils/getRandomFrom";
import * as tunnel from 'tunnel';


interface IProxyConfig {
    proxies: string[]
}

export default class ProxyMiddleware extends BaseMiddleware{

    onRequestBefore(config: AxiosRequestConfig, ctx: IProxyConfig): AxiosRequestConfig<any> {

        const randomProxy = ctx.proxies[getRandomFrom(0, ctx.proxies.length - 1)];

        // const agent = tunnel.httpsOverHttp({
        //     proxy: {
        //         host: 'timothy.onlineproxy.io',
        //         port: 50100,
        //         proxyAuth: 'OaNRhCtH:HoYPnpldMO'
        //     }
        // })

        // console.log(agent);
        

        // config.proxy = {
        //     protocol: 'http', // или 'https' в зависимости от прокси
        //     host: '80.243.140.54', // IP или хост прокси
        //     port: 59100,
        //     auth: {
        //         username: 'pavikforcebussines',
        //         password: 'bQDkmAabC2'
        //     },
        // }
        // config.httpAgent = new HttpsProxyAgent(randomProxy)

        return config;
    }

}