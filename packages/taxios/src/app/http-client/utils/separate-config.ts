import {ITHttpClientConfig} from "../interface";
import {AxiosRequestConfig} from "axios";


type THttpClientConfigAndAxios = ITHttpClientConfig | AxiosRequestConfig

export const separateConfig = (config: THttpClientConfigAndAxios) => {

}