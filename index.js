// Imports
const prompt = require('prompt-sync')();

function frameMaker(points, throws) {

    let scoreFrame = {
        score: points,
        extraThrows: throws
    };

    return scoreFrame;
}


function computeScore() {

    // Variable Declarations
    let tmpScorecard = prompt("Enter your scorecard: ");
    const scorecard = ' ' + tmpScorecard;
    let finalScore = 0;
    let i = 0;
    let frameArray = [];
    let slashIndexes = [0];

    // Gets indexes of '-'
    while (i !== scorecard.length) {

        if (scorecard.charAt(i) === '-') {
            slashIndexes.push(i);
            // console.log(`dash at: ${i};  char: ${scorecard.charAt(i)}`);
        }

        i++;
    }

    // console.log(slashIndexes);

    // Start computing score
    for (let j = 0; j < slashIndexes.length; j++) {
        if (slashIndexes[j] === slashIndexes[slashIndexes.length-1]) {
            //compute til end of string
            for (let k = slashIndexes[j] + 1; k < scorecard.length; k++) {
                console.log(`char= ${scorecard.charAt(k)}`);

            }

        }
        else {
            //compute until the next index
            // console.log(`Index: ${slashIndexes[j]}`);
            for (let k = slashIndexes[j] + 1; k < slashIndexes[j + 1]; k++) {
                console.log(`char= ${scorecard.charAt(k)}`);

            }
        }
    }

    return finalScore;
}

const bowlingScore = computeScore();

console.log(`bowlingScore: ${bowlingScore}`);