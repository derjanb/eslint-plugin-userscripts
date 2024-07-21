var rule = require('..')['avoid-regexp-include'];
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('avoid-regexp-include', rule, {
  valid: [
    `// ==UserScript==
    // @description This is my description
    // @include https://*
    // ==/UserScript==`,
  ],
  invalid: [
    {
      code: `// ==UserScript==
      // @include /https?:\\/\\/foo.bar\\/.*/
      // ==/UserScript==`,
      errors: [{ messageId: 'avoidRegExpInclude' }]
    }
  ]
});