const { IncomingMessage, ServerResponse } = require('http');

function setFields(obj, fields) {
  for (const field of fields) {
    if (Array.isArray(field)) {
      obj[field[0]] = field[1];
    } else {
      obj[field] = null;
    }
  }
}

module.exports = (options) => {
  if (typeof options !== 'object')
    throw new TypeError('Options must be an object');

  const { request, response } = options;

  const obj = {};

  if (Array.isArray(request) && request.length) {
    obj['IncomingMessage'] = class extends IncomingMessage {
      constructor(...args) {
        super(...args);
        setFields(this, request);
      }
    };
  }
  if (Array.isArray(response) && response.length) {
    obj['ServerResponse'] = class extends ServerResponse {
      constructor(...args) {
        super(...args);
        setFields(this, response);
      }
    };
  }

  return obj;
};
