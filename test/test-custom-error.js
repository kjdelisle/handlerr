'use strict';

var fmt = require('util').format;
var errata = require('../index');
var tap = require('tap');

tap.test('Custom Error testing', function(t) {
  t.test('error function - default handler', function(t) {
    var message = 'Why did you DO that!?';
    var code = 'SILLY';
    var SillyError = errata.create('SillyError', code);
    try {
      throw new SillyError(message);
    } catch (err) {
      t.equal(err.message, message, 'provided message returned');
      t.equal(err.code, code, 'provided code returned');
      t.ok(err.stack, 'error has a stack trace');
      t.type(err, SillyError, 'error is correct type');
    }
    t.end();
  });

  t.test('error function - quick create', function(t) {
    var message = 'Why did you DO that!?';
    var code = 'SILLY';
    var SillyError = errata('SillyError', code);
    try {
      throw new SillyError(message);
    } catch (err) {
      t.equal(err.message, message, 'provided message returned');
      t.equal(err.code, code, 'provided code returned');
      t.ok(err.stack, 'error has a stack trace');
      t.type(err, SillyError, 'error is correct type');
    }
    t.end();
  });

  t.test('error function - custom handler', function(t) {
    var srs = 'SUPER SERIOUS ALERT: ';
    var code = 'SRS';
    var SeriousError = errata.create('SeriousError', code, function(msg) {
      this.message = fmt('%s: %s', srs, msg);
    });
    var noIceCream = 'We ran out of ice cream!';
    try {
      throw new SeriousError(noIceCream);
    } catch (err) {
      t.equal(err.message, fmt('%s: %s', srs, noIceCream),
        'formatted message is correct');
      t.equal(err.code, code, 'provided code returned');
      t.ok(err.stack, 'error has a stack trace');
      t.type(err, SeriousError, 'error is correct type');
    }
    t.end();
  });
  t.end();
});
