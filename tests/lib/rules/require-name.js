var rule = require('..')['require-name'];
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('require-name', rule, {
  valid: [
    `// ==UserScript==
    // @name This is my description
    // ==/UserScript==`
  ],
  invalid: [
    {
      code: `// ==UserScript==
      // @description abc
      // ==/UserScript==`,
      errors: [{ messageId: 'missingAttribute' }]
    },
    {
      code: `// ==UserScript==
      // @name This is my name
      // @name This is my second name
      // ==/UserScript==
      console.info(variable)
      debugger
      /* debugging above */`,
      errors: [{ messageId: 'multipleNames' }]
    },
    {
      code: `// ==UserScript==
      // @description This is my description
      // @name This is my name
      // ==/UserScript==`,
      output: `// ==UserScript==
      // @name This is my name
      // @description This is my description
      // ==/UserScript==`,
      errors: [{ messageId: 'nameAtBeginning' }]
    }
  ]
});
