import {TEmitEvents} from "./interface";


export class TEmitter {

    private _events = new Map()
    private _eventName: TEmitEvents[] = [
        'request:success',
        'request:error',
        'response:success',
        'response:error',
    ]

    constructor() {
        this.init()
    }

    init() {
        this._eventName.forEach(event => {
            this._events.set(event, [])
        })
    }

    on(name: TEmitEvents, fn) {
        const event = this._events.get(name)

        if(!event){
            throw new Error(`${name} event doesn't exist`)
        }

        event.push(fn)

        return this
    }


    emit(name: TEmitEvents){
        const events = this._events.get(name)

        if(events.length){

            events.forEach((event) => {
                event()
            })

        }
    }




}