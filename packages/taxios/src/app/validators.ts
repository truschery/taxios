

export const isClass = (obj) => {
    return typeof obj === 'function' &&
        obj.prototype &&
        Object.getOwnPropertyNames(obj.prototype).length > 1
}