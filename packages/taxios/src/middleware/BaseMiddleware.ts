import { AxiosRequestConfig } from "axios";
import { IMiddlewareClass } from '../core/types'


export default class BaseMiddleware implements IMiddlewareClass {
  config
  priority

  constructor(config = { priority: 0 }) {
    this.config = config;
    this.priority = config?.priority;
  }

  /**
   * Обработка запроса
   * @param {Object} config - Конфигурация axios
   * @param ctx
   * @returns {Object}
   */
  onRequestBefore(config: AxiosRequestConfig, ctx?: any) {
    return config;
  }

  onRequestAfter(config: any, ctx?: any){
    return config
  }

  /**
   * Обработка ответа
   * @param {Object} response - Ответ от сервера
   * @param ctx
   * @returns {Object}
   */
  onResponseSuccess(response: any, ctx?: any) {
    return response;
  }

  onResponseError(error: any, ctx?: any) {
    return error;
  }

  /**
   * Обработка ошибки
   * @param {Error} error - Объект ошибки
   * @param ctx
   * @returns {Promise}
   */
  onError(error: any, ctx?: any) {
    return Promise.reject(error);
  }
}