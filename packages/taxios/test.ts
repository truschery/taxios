import {ProxyMiddleware, TaxiosClient} from "./src";


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
    client.get('https://httpbin.org/ip', {
            protocol: 'http', // или 'https' в зависимости от прокси
            host: '80.243.140.54', // IP или хост прокси
            port: 59100,
            auth: {
                username: 'pavikforcebussines',
                password: 'bQDkmAabC2'
            },
        }).then(result => {
        console.log(result)

    })

    return 0
}

main()