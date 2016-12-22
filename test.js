#!/usr/bin/env node

'use strict';

const irc  = require('./lib/irc.js');
const util = require('util');
const color = require('ansi-color').set;

const c = new irc.Client(
    'irc.dollyfish.net.nz',
    'MrNodeBotTest',
    {
        channels: ['#funsociety-irc'],
    }
);

c.addListener('raw', function(message) { console.log('raw: ', message) });
c.addListener('error', function(message) { console.log(color('error: ', 'red'), message) });

var repl = require('repl').start('> ');
repl.context.repl = repl;
repl.context.util = util;
repl.context.irc = irc;
repl.context.c = c;

repl.inputStream.addListener('close', function() {
    console.log("\nClosing session");
    c.disconnect('Closing session');
});
