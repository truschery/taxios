import {ProxyMiddleware, TaxiosClient} from "./src";
import { ProxyAgent, fetch } from "undici"
import tunnel from 'tunnel'



const agent1 = tunnel.httpOverHttps({
    proxy: {
            host: 'http://80.243.140.54', // IP или хост прокси
            port: 59100,
            proxyAuth: 'pavikforcebussines:bQDkmAabC2'
        }
})


const client = new TaxiosClient({
    axios: {
        baseURL: 'https://jsonplaceholder.typicode.com',
    },
})


// @ts-ignore
client.use(ProxyMiddleware, 'request:before', {
    proxies: [
        '108.141.130.146:80',
        '108.162.192.0:80',
        '108.162.192.194:80',
        '102.177.176.101:80'
    ]
})

const main = async () => {
    //46.3.132.179:59100:pavikforcebussines:bQDkmAabC2
    const agent = new ProxyAgent('http://pavikforcebussines:bQDkmAabC2@46.3.132.179:59100')


    // {
    //         protocol: 'http', // или 'https' в зависимости от прокси
    //         host: '80.243.140.54', // IP или хост прокси
    //         port: 59100,
    //         auth: {
    //             username: 'pavikforcebussines',
    //             password: 'bQDkmAabC2'
    //         },
    //     }


    fetch('https://httpbin.org/ip', {
        // dispatcher: agent,
    }).then(async result => {
        console.log(await result.text());
        
    })

    // client.get('https://httpbin.org/ip', {
    //     httpsAgent: agent1,
    // }).then(result => {
    //     console.log(result)

    // })

    return 0
}

main()