module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'ensure atributes are prefixed by one space',
      category: 'Possible Errors'
    },
    messages: {
      attributeNotPrefixedBySpace: 'Attributes should be prefixed by one space'
    },
    schema: []
  },
  create: (context) => {
    const sourceCode = context.getSourceCode();
    const lines = sourceCode.lines;
    let inMetadata = false;
    let done = false;

    for (const [index, line] of lines.entries()) {
      if (done) {
        continue;
      }

      const tl = line.trim();
      if (
        inMetadata &&
        tl.startsWith('//') &&
        tl.slice(2).trim() === '==/UserScript=='
      ) {
        done = true;
      } else if (
        !inMetadata &&
        tl.startsWith('//') &&
        tl.slice(2).trim() === '==UserScript=='
      ) {
        inMetadata = true;
      } else if (
        inMetadata &&
        tl.slice(2).trim().startsWith('@') &&
        tl.startsWith('//') &&
        (!tl.startsWith('// ') || tl.startsWith('//  '))
      ) {
        context.report({
          loc: {
            start: {
              line: index + 1,
              column: 0
            },
            end: {
              line: index + 1,
              column: line.length
            }
          },
          messageId: 'attributeNotPrefixedBySpace'
        });
      }
    }

    return {};
  }
};
