const csp = require('express-csp');
const helmet = require('helmet');

exports.helmet = helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'", 'https://*.mapbox.com', 'https://*.stripe.com'],
    baseUri: ["'self'"],
    fontSrc: ["'self'", 'https:', 'data:'],
    imgSrc: ["'self'", 'https://www.gstatic.com'],
    scriptSrc: [
      "'self'",
      'https://*.stripe.com',
      'https://cdnjs.cloudflare.com',
      'https://api.mapbox.com',
      'https://js.stripe.com',
      "'blob'"
    ],
    frameSrc: ["'self'", 'https://*.stripe.com'],
    objectSrc: ["'none'"],
    upgradeInsecureRequests: true
  }
});

exports.csp = app =>
  csp.extend(app, {
    policy: {
      directives: {
        defaultSrc: ["'self'", 'data:', 'blob:', 'https:', 'ws:'],
        baseUri: ["'self'"],
        fontSrc: ["'self'", 'https:', 'data:'],
        scriptSrc: [
          "'self'",
          'https:',
          'http:',
          'blob:',

          'https://*.mapbox.com',
          'https://js.stripe.com',
          'https://m.stripe.network',
          'https://*.cloudflare.com'
        ],
        frameSrc: ["'self'", 'https://js.stripe.com'],
        objectSrc: ["'none'"],
        styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
        workerSrc: [
          "'self'",
          'data:',
          'blob:',
          'https://*.tiles.mapbox.com',
          'https://api.mapbox.com',
          'https://events.mapbox.com',
          'https://m.stripe.network'
        ],
        childSrc: ["'self'", 'blob:'],
        imgSrc: ["'self'", 'data:', 'blob:'],
        formAction: ["'self'"],
        connectSrc: [
          "'self'",
          "'unsafe-inline'",
          'data:',
          'blob:',
          'https://*.stripe.com',
          'https://*.mapbox.com',
          'https://*.cloudflare.com/',
          'https://bundle.js:*',
          'ws://127.0.0.1:*/'
        ],
        upgradeInsecureRequests: []
      }
    }
  });
// );
//     'default-src': ['self'],
//     'style-src': ['self', 'unsafe-inline', 'https:'],
//     'font-src': ['self', 'https://fonts.gstatic.com'],
//     'script-src': [
//       'self',
//       'unsafe-inline',
//       'data',
//       'blob',
//       'https://js.stripe.com',
//       'https://*.mapbox.com',
//       'https://*.cloudflare.com/',
//       'https://bundle.js:8828',
//       'ws://localhost:56558/'
//     ],
//     'worker-src': [
//       'self',
//       'unsafe-inline',
//       'data:',
//       'blob:',
//       'https://*.stripe.com',
//       'https://*.mapbox.com',
//       'https://*.cloudflare.com/',
//       'https://bundle.js:*',
//       'ws://localhost:*/'
//     ],
//     'frame-src': [
//       'self',
//       'unsafe-inline',
//       'data:',
//       'blob:',
//       'https://*.stripe.com',
//       'https://*.mapbox.com',
//       'https://*.cloudflare.com/',
//       'https://bundle.js:*',
//       'ws://localhost:*/'
//     ],
//     'img-src': [
//       'self',
//       'unsafe-inline',
//       'data:',
//       'blob:',
//       'https://*.stripe.com',
//       'https://*.mapbox.com',
//       'https://*.cloudflare.com/',
//       'https://bundle.js:*',
//       'ws://localhost:*/'
//     ],
//     'connect-src': [
//       'self',
//       'unsafe-inline',
//       'data:',
//       'blob:',
//       // 'wss://<HEROKU-SUBDOMAIN>.herokuapp.com:<PORT>/',
//       'https://*.stripe.com',
//       'https://*.mapbox.com',
//       'https://*.cloudflare.com/',
//       'https://bundle.js:*',
//       'ws://localhost:*/'
//     ]
//   }
// }

// });