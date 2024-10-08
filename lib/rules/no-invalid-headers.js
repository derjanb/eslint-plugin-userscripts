const createValidator = require('../utils/createValidator');

// Documentation:
// - Tampermonkey: https://www.tampermonkey.net/documentation.php
// - Violentmonkey: https://violentmonkey.github.io/api/metadata-block/
// - Greasemonkey: https://wiki.greasespot.net/Metadata_Block
const validHeaders = new Set(
  [
    'antifeature',
    'author',
    'connect',
    'contributor',
    'contributors',
    'copyright',
    'defaulticon',
    'description',
    'developer',
    'downloadURL',
    'exclude',
    'grant',
    'history',
    'homepage',
    'homepageURL',
    'icon',
    'icon64',
    'icon64URL',
    'iconURL',
    'include',
    'license',
    'match',
    'name',
    'namespace',
    'nocompat',
    'noframes',
    'require',
    'resource',
    'run-at',
    'run-in',
    'sandbox',
    'source',
    'supportURL',
    'tag',
    'unwrap',
    'updateURL',
    'version',
    'website'
  ].map((header) => `@${header}`)
);
const internationalized = ['name', 'description', 'antifeature'].map(
  (item) => new RegExp(`^@${item}(:\\S+)?$`)
);

module.exports = createValidator(
  'headers',
  false,
  ({ attrVal, context }) => {
    const o = context.options[0];
    const optionsHeaders = new Set(
      (o && o.allowed || []).map((header) => `@${header}`)
    );

    for (const value of attrVal) {
      const headerName = `@${value.key}`;
      const isValid =
        validHeaders.has(headerName) ||
        optionsHeaders.has(headerName) ||
        // use regex for internationalised headers
        internationalized.some((regex) => regex.test(headerName));

      if (!isValid) {
        context.report({
          loc: {
            start: {
              line: value.loc.start.line,
              column: 0
            },
            end: value.loc.end
          },
          messageId: 'invalidHeader',
          data: {
            header: headerName
          }
        });
      }
    }
  },
  {
    invalidHeader: "'{{ header }}' is not a valid userscript header"
  },
  false,
  /./, // match every header
  true,
  [
    {
      type: 'object',
      properties: {
        allowed: {
          type: 'array'
        }
      },
      additionalProperties: false
    }
  ]
);
