import readline from 'readline';
import clear from 'clear';

import { main } from './server';

clear();

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