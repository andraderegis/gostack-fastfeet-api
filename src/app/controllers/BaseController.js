class BaseController {
  constructor({ container, model }) {
    this._container = container;
    this._model = model;

    /**
     * @type {TryAwaitControllerResponse}
     */
    this._tryAwaitControllerResponse = this._container.resolve(
      'tryAwaitControllerResponse'
    );
  }

  async create(req, res, next) {
    const processResult = this._model.create(req.body);

    return this._tryAwaitControllerResponse.tryAwaitProcessResult({
      processResult,
      res,
      next,
      successStatusCode: 201,
    });
  }
}

export default BaseController;
