class Router {
  constructor() {
    this.routes = {
      get: [],
      post: [],
      put: [],
      delete: []
    };
    this.error = null;
    this.notFound = null;
  }

  addGet(path, handler) {
    const matcher = new RegExp(path);
    this.routes.get.push({ path, matcher, handler });
  }

  addPost(path, handler) {
    const matcher = new RegExp(path);
    this.routes.post.push({ path, matcher, handler });
  }

  addPut(path, handler) {
    const matcher = new RegExp(path);
    this.routes.put.push({ path, matcher, handler });
  }

  addDelete(path, handler) {
    const matcher = new RegExp(path);
    this.routes.delete.push({ path, matcher, handler });
  }

  setError(handler) {
    this.error = handler;
  }

  setNotFound(handler) {
    this.notFound = handler;
  }

  async handle(method, path, pathParams, query, body) {
    console.log(`method ${method}`);
    console.log(`path ${path}`);
    console.log(`pathParams ${pathParams}`);
    console.log(`query ${query}`);
    console.log(`body ${body}`);

    // find method
    let methodSet = null;

    switch (method) {
      case 'get':
        methodSet = this.routes.get;
        break;

      case 'post':
        methodSet = this.routes.post;
        break;

      case 'put':
        methodSet = this.routes.put;
        break;

      case 'delete':
        methodSet = this.routes.delete;
        break;

      default:
        methodSet = null;
        break;
    }

    console.log(`method set ${JSON.stringify(methodSet)}`);

    if (methodSet === null) {
      console.log('not found - no method');
      return this.notFound({ method, path, pathParams, query, body });
    }

    // find path and handler
    let handler = null;
    for (const pathSet of methodSet) {
      // if (path.match(pathSet.matcher.match)) {
      if (path === pathSet.path) {
        console.log(`found handler ${JSON.stringify(pathSet)}`);
        handler = pathSet.handler;
        break;
      }
    }

    if (!handler) {
      console.log('not found - no handler');
      return this.notFound({ method, path, query, body });
    }

    return handler({ method, path, pathParams, query, body });
  }
}

module.exports.init = () => new Router();
