const http = require('http');
const tap = require('tap');
const decorate = require('../src/index.cjs');

tap.test('decorate', (t) => {
  t.throws(() => decorate(), TypeError);
  {
    const res = decorate({});
    t.notOk(res.IncomingMessage);
    t.notOk(res.ServerResponse);
  }
  {
    const { IncomingMessage, ServerResponse } = decorate({
      request: ['user', 'token'],
      response: ['user', 'token'],
    });
    const incomingMessage = new IncomingMessage();
    const serverResponse = new ServerResponse(incomingMessage);
    t.equal(incomingMessage.user, null);
    t.equal(incomingMessage.token, null);
    t.equal(serverResponse.user, null);
    t.equal(serverResponse.token, null);
  }
  t.end();
});

tap.test('decorate with custom values', (t) => {
  t.throws(() => decorate(), TypeError);
  function toJson(data) {
    return JSON.stringify(data);
  }
  const { IncomingMessage, ServerResponse } = decorate({
    request: [['json', toJson]],
    response: [['json', toJson]],
  });
  const incomingMessage = new IncomingMessage();
  const serverResponse = new ServerResponse(incomingMessage);
  t.equal(incomingMessage.json, toJson);
  t.equal(serverResponse.json, toJson);
  t.end();
});

tap.test('decorate http server', (t) => {
  t.plan(1);
  const server = http.createServer(
    decorate({ request: ['user'] }),
    (req, res) => {
      t.equal(req.user, null);
      return res.end('OK');
    }
  );
  server.unref();
  server.listen(0, () => {
    const url = 'http://localhost:' + server.address().port;
    http
      .request(url, (res) => {
        res.on('end', () => t.end());
      })
      .end();
  });
  t.teardown(() => server.close());
});
