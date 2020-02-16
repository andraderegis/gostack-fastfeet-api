import { RESOLVER, Lifetime, InjectionMode } from 'awilix';

class TryAwaitControllerResponse {
  constructor() {}

  /**
   *
   * @param res
   * @returns {Function}
   */
  successResponse(res) {
    return ({ statusCode, result }) => {
      res.status(statusCode).json({
        count: result.count ? result.count : 0,
        result: result.result ? result.result : result,
      });
    };
  }

  /**
   *
   * @param next {Function}
   * @returns {Function}
   */
  errorResponse(next) {
    return ({ statusCode, message, err }) => {
      next({
        code: err && err.code ? err.code : statusCode,
        message: message,
        stack: err,
      });
    };
  }

  /**
   *
   * @param res
   * @returns {{try: Function, catch: Function}}
   */
  callbackResponse(res) {
    return {
      try: this.successResponse(res),
      catch: this.errorResponse(res),
    };
  }

  /**
   *
   * @param processResult
   * @param res {Express.response}
   * @param next
   * @param successStatusCode {Number}
   * @param errorStatusCode {Number}
   * @returns {Promise<void>}
   */
  async tryAwaitProcessResult({
    processResult,
    res,
    next,
    successStatusCode = 200,
    errorStatusCode = 500,
  }) {
    try {
      const data = await processResult;
      this.callbackResponse(res).try({
        statusCode: successStatusCode,
        result: data,
      });
    } catch (err) {
      this.callbackResponse(next).catch({
        statusCode: err.status || err.statusCode || errorStatusCode,
        message: err.message,
        err: err,
      });
    }
  }

  /**
   *
   * @param processResult
   * @param res
   * @param next
   * @param successStatusCode
   * @param errorStatusCode
   * @returns {Promise<void>}
   */
  async tryProcessResult({
    processResult,
    res,
    next,
    successStatusCode = 200,
    errorStatusCode = 500,
  }) {
    try {
      this.callbackResponse(res).try({
        statusCode: successStatusCode,
        result: processResult,
      });
    } catch (err) {
      this.callbackResponse(next).catch({
        statusCode: err.status || err.statusCode || errorStatusCode,
        message: err.message,
        err: err,
      });
    }
  }
}

TryAwaitControllerResponse[RESOLVER] = {
  name: 'tryAwaitControllerResponse',
  lifetime: Lifetime.SINGLETON,
  injectionMode: InjectionMode.PROXY,
};

export default TryAwaitControllerResponse;
