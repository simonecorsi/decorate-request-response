# decorate-request-response

<!-- toc -->

- [About The Project](#about-the-project)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

<!-- tocstop -->

## About The Project

This package allow for decorating request and/or response objects without modifying the [shape of the object](https://mathiasbynens.be/notes/shapes-ics) on each requests.

<!-- GETTING STARTED -->

## Installation

```sh
npm i @scdev/decorate-request-response
```

<!-- USAGE EXAMPLES -->

## Usage

> _NB_ Avoid overriding existing properties

```js
const { createServer } = require('http');

const decorate = require('@scdev/decorate-request-response');
const { IncomingMessage, ServerResponse } = decorate({
  request: ['user'],
  response: ['user'],
});

createServer(
  {
    IncomingMessage,
    ServerResponse,
  },
  (req, res) => {
    // req.user === null
    // res.user === null
    res.end();
  }
).listen(3000);
```

<!-- CONTRIBUTING -->

## Contributing

Project is pretty simple and straight forward for what is my needs, but if you have any idea you're welcome.

This projects uses [commitizen](https://github.com/commitizen/cz-cli) so be sure to use standard commit format or PR won't be accepted

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat(scope): some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Simone Corsi - [@im_simonecorsi](https://twitter.com/im_simonecorsi)
