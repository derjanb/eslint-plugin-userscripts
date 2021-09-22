const createValidator = require('../utils/createValidator');

module.exports = createValidator(
  'version',
  true,
  (attrVal, index, indexMatch, metadata, context) => {
    if (index > 0) {
      context.report({
        loc: attrVal.loc,
        messageId: 'multipleVersions'
      });
    }
    if (!/^([0-9a-zA-Z\-]+)(\.[0-9a-zA-Z\-]+)*\s*$/.test(attrVal.val)) {
      context.report({
        loc: {
          start: {
            line: attrVal.loc.start.line,
            column:
              /^(\s*\/\/\s*)/.exec(
                context.getSourceCode().lines[attrVal.comment.loc.start.line]
              )[1].length - 1
          },
          end: attrVal.loc.end
        },
        messageId: 'invalidVersion'
      });
    }
  },
  {
    multipleVersions: 'Include only one version',
    invalidVersion: 'Invalid version'
  }
);
