// Imports
const prompt = require('prompt-sync')();

// Variable Declarations
const scorecard = prompt("Enter your scorecard: ");
let finalScore = 0;
let i = 0;
let slashIndexes = [0];

// Gets indexes of '-'
while (i !== scorecard.length) {

    if (scorecard.charAt(i) === '-') {
        slashIndexes.push(i);        
        // console.log(`dash at index ${i}`);
    }

    i++;
}

// Start computing score
for (i = 0; i < slashIndexes.length; i++) {
    if(i+1 === slashIndexes.length) {
        //compute til end of string
        console.log(`Last index is at: ${slashIndexes[i]}`);
    }
    else {
        //compute until the next index
        console.log(`Index: ${slashIndexes[i]}`);

    }
}

