
export interface TMiddlewareConfig {
    useDefaultMiddlewares?: boolean,
}

export const middlewareConfig = {
    events: {
        'request:before': {
            className: 'onRequestBefore',
            
        }
    }
}


export default {
    useDefaultMiddlewares: true
} as TMiddlewareConfig