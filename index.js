const { IncomingMessage, ServerResponse } = require('http');

module.exports = (options) => {
  if (typeof options !== 'object')
    throw new TypeError('Options must be an object');

  const { request, response } = options;

  const obj = {};

  // TODO Implement filtering to avoid overriding exisint.

  if (Array.isArray(request) && request.length) {
    obj['IncomingMessage'] = class extends IncomingMessage {
      constructor(...args) {
        super(...args);
        for (const field of request) {
          this[field] = null;
        }
      }
    };
  }
  if (Array.isArray(response) && response.length) {
    obj['ServerResponse'] = class extends ServerResponse {
      constructor(...args) {
        super(...args);
        for (const field of response) {
          this[field] = null;
        }
      }
    };
  }

  return obj;
};
