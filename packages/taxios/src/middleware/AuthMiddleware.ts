import BaseMiddleware from "./BaseMiddleware";



export default class AuthMiddleware extends BaseMiddleware {
    
    onRequestBefore(config: any) {
        return config
    }

}