import { AxiosRequestConfig } from 'axios';
import { IMiddlewareClass, IMiddlewareHandler, TMiddleware, TMiddlewareManagerTypes } from '../core/types';
import { isClass } from '../utils/validators';
import BaseMiddleware from './BaseMiddleware'


export default class MiddlewareManager {
  middlewares: Map<string, IMiddlewareHandler[]>
  supportedTypes

  constructor() {
    this.middlewares = new Map();
    this.supportedTypes = new Set(['request:before', 'request:after', 'response:success', 'response:error']);
  }

  /**
   * Добавление нового типа обработчика
   * @param {string} type - Тип обработчика
   */
  addType(type: string) {
    this.supportedTypes.add(type);
    if (!this.middlewares.has(type)) {
      this.middlewares.set(type, []);
    }
  }

  /**
   * Получение всех поддерживаемых типов
   */
  getSupportedTypes() {
    return Array.from(this.supportedTypes);
  }

  /**
   * Генерация уникального ID
   */
  generateId() {
    return `middleware_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Добавление middleware
   * @param {Function|BaseMiddleware} middleware 
   * @param {string|string[]} types - Тип(ы) обработчика
   */
  add(middleware: TMiddleware, types = 'request:before') {
    const typesList = Array.isArray(types) ? types : [types];
    
    typesList.forEach(type => {
      if (!this.supportedTypes.has(type)) {
        throw new Error(`Неподдерживаемый тип middleware: ${type}. Поддерживаемые типы: ${Array.from(this.supportedTypes).join(', ')}`);
      }

      // Инициализация массива для типа, если его нет
      if (!this.middlewares.has(type)) {
        this.middlewares.set(type, []);
      }

      const middlewareList = this.middlewares.get(type);
      
      if (typeof middleware === 'function') {
        middlewareList!.push({ 
          handler: middleware, 
          priority: 0,
          type: type,
          id: this.generateId()
        });
      } else if (middleware instanceof BaseMiddleware) {
        middlewareList!.push({ 
          handler: middleware, 
          priority: middleware.priority,
          type: type,
          id: this.generateId()
        });
      } else {
        throw new Error('Middleware должен быть функцией или наследником BaseMiddleware');
      }

      // Сортировка по приоритету
      middlewareList!.sort((a, b) => b.priority - a.priority);
    });
  }

  /**
   * Удаление middleware по ID
   * @param {string} id - ID middleware
   */
  remove(id: string) {
    for (const [type, middlewareList] of this.middlewares) {
      const index = middlewareList.findIndex(m => m.id === id);
      if (index !== -1) {
        middlewareList.splice(index, 1);
        return true;
      }
    }
    return false;
  }

  /**
   * Получение middleware по типу
   * @param {string} type - Тип middleware
   */
  get(type: string) {
    if (!this.middlewares.has(type)) {
      return [];
    }
    
    return this.middlewares.get(type)!.map(m => {

      if(isClass(m.handler)){
        const executor = this.createExecutor(m.handler as IMiddlewareClass, type);
        return { ...m, executor };
      }
        
      if (typeof m.handler === 'function') {
        return { ...m, executor: m.handler };
      }
      
    });
  }

  /**
   * Создание executor'а для класса middleware
   * @param {BaseMiddleware} handler 
   * @param {string} type 
   */
  createExecutor(handler: IMiddlewareClass, type: string) {
    const handlerClass = new (handler as any)()

    switch (type) {
      case 'request:before':
        
        
        return (config: AxiosRequestConfig) => handlerClass.onRequestBefore(config);
      case 'request:after':
        return (config: AxiosRequestConfig) => handlerClass.onRequestAfter(config);
      case 'response':
        return {
          fulfilled: (response: any) => handlerClass.onResponseSuccess(response),
          rejected: (error: any) => handlerClass.onResponseError(error)
        };
      case 'error':
        return (error: any) => handlerClass.onError(error);
      default:
        // Для пользовательских типов пытаемся найти соответствующий метод
        const methodName = `on${type.charAt(0).toUpperCase() + type.slice(1)}`;
        // if (typeof handlerClass[methodName] === 'function') {
        //   return (...args) => handler[methodName](...args);
        // }
        throw new Error(`Метод ${methodName} не найден в middleware для типа ${type}`);
    }
  }

  getExecutorMiddlewares(type: string) {
    return this.get(type).map(m => m?.executor);
  }
}