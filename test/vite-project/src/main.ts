import { TaxiosClient, ProxyMiddleware } from "@truschery/taxios"


const client = new TaxiosClient({
    axios: {
        baseURL: 'https://jsonplaceholder.typicode.com',
        proxy: {
            protocol: 'http', // или 'https' в зависимости от прокси
            host: '108.162.192.0', // IP или хост прокси
            port: 80,
        }
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
    client.get('https://httpbin.org/ip',{
        proxy: {
            protocol: 'http', // или 'https' в зависимости от прокси
            host: 'proxy.scrapingbee.com', // IP или хост прокси
            port: 8886,
            auth: {
                username: '4STS0F0CWRT0ZAHWI5JC15IKBZMOSPE3U9Y3JII91JSY3QCPAEXARPKVGNZ39SXC5W41YCHXXRVE39XF',
                password: 'HoYPnpldMO'
            },
        }
    }).then(result => {
        console.log(result.config)
        console.log(result)
        
    })
}

main()