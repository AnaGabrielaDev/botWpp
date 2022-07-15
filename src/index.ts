import readline from 'readline';
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';

import { main } from './server';

clear();
console.log(
    chalk.green(
      figlet.textSync('WhatsTalks', { horizontalLayout: 'controlled smushing' })
    )
);

const read_line = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

read_line.question('which contact do you want to send the messages?\n', function(name) {
    main(name);
});

read_line.on('close', function () {
    console.log("XOXO !!!");
    process.exit(0);
});