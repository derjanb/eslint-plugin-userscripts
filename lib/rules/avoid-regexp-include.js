const createValidator = require('../utils/createValidator');

module.exports = createValidator(
  'include',
  false,
  ({ attrVal, context }) => {
    const argument = attrVal.val;
    if (argument.startsWith('/')) {
      context.report({
        loc: {
          start: {
            line: attrVal.loc.start.line,
            column: 0
          },
          end: attrVal.loc.end
        },
        messageId: 'avoidRegExpInclude'
      });
    }
  },
  {
    avoidRegExpInclude: "Using a regular expression at '@include' can cause performance issues. Use a regular @include or @match instead."
  }
);