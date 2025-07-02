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
   * @returns {Object}
   */
  onRequestBefore(config: AxiosRequestConfig) {
    return config;
  }

  onRequestAfter(config: any){
    return config
  }

  /**
   * Обработка ответа
   * @param {Object} response - Ответ от сервера
   * @returns {Object}
   */
  onResponseSuccess(response: any) {
    return response;
  }

  onResponseError(error: any) {
    return error;
  }

  /**
   * Обработка ошибки
   * @param {Error} error - Объект ошибки
   * @returns {Promise}
   */
  onError(error: any) {
    return Promise.reject(error);
  }
}