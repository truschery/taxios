import {CustomAxios} from "./CustomAxios.ts";


class Api extends CustomAxios {


    getDoc(params?: any){
        this.get('/todos').then(response => {

            console.log(response)

        })
    }

}


const api = new Api()


async function main(){
    api.getDoc()
}

main()