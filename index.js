// Imports
const prompt = require('prompt-sync')();

/**
 * 
 * @description Returns an object to track each frame.
 * @author Earl Tankard, Jr.
 * @param {*} points 
 * @param {*} throws 
 * @returns scoreFrame
 */
function frameMaker(points, throws) {

    let scoreFrame = {
        score: points,          // points for the frame
        extraThrows: throws     // number of throws to keep track of after frame is finished
    };

    return scoreFrame;
}

/**
 * @description Computes the final score of an American Ten-Pin Bowling game.
 * @author Earl Tankard, Jr.
 */
function computeScore() {

    // Variable Declarations
    let tmpScorecard = prompt("Enter your scorecard: ");    // gets input from user
    const scorecard = ' ' + tmpScorecard;                   // prepends ' ' to avoid reading the '-' character
    let finalScore = 0;                                     // final score of all of the frames
    let i = 0;
    let frameArray = [];                                    // stores the frame objects
    let slashIndexes = [0];                                 // stores the indices of '-' in scorecard

    try {
        // Gets indexes of '-'
        while (i !== scorecard.length) {

            if (scorecard.charAt(i) === '-') {
                slashIndexes.push(i);
            }
            i++;
        }

        // Start computing score
        for (let j = 0; j < slashIndexes.length; j++) {
            let tmpSum = 0;
            let tmpThrows = 0;
            if (slashIndexes[j] === slashIndexes[slashIndexes.length - 1]) {        // Compute til end of string
                for (let k = slashIndexes[j] + 1; k < scorecard.length; k++) {
                    // check for 'X', '/', or number
                    if (scorecard.charAt(k).toUpperCase() === 'X') {
                        //create scoreFrame with score of 10, throws of 2
                        tmpSum = 10;
                        tmpThrows = 2;
                    } else if (scorecard.charAt(k) === '/') {
                        //create scoreFrame with score of 10, throws of 1
                        tmpSum = 10;
                        tmpThrows = 1;
                    } else {
                        tmpSum += Number(scorecard.charAt(k));
                        tmpThrows = 0;
                    }
                }
            } else {        // Compute until the next index
                for (let k = slashIndexes[j] + 1; k < slashIndexes[j + 1]; k++) {
                    //check for 'X', '/', or number
                    if (scorecard.charAt(k).toUpperCase() === 'X') {
                        //create frameObj with score of 10, throws of 2
                        tmpSum = 10;
                        tmpThrows = 2;
                    } else if (scorecard.charAt(k) === '/') {
                        //create frameObj with score of 10, throws of 1
                        tmpSum = 10;
                        tmpThrows = 1;
                    } else {
                        tmpSum += Number(scorecard.charAt(k));
                        tmpThrows = 0;
                    }
                }
            }
            // Create scoreFrame object
            let newFrame = frameMaker(tmpSum, tmpThrows);
            frameArray.push(newFrame);

            // Checks for throws && increments previous frame scores if > 0
            frameArray.forEach(frame => {
                if (frame.extraThrows > 0) {
                    frame.score += tmpSum;
                    frame.extraThrows--;
                }
            })
        }
        console.log(`frameArray: ${JSON.stringify(frameArray)}`);
        frameArray.forEach(frame => {
            finalScore += frame.score;
        })
        return finalScore;

    } catch (err) {
        console.log(`Error: ${err}`);
        return -1;
    }
}

const bowlingScore = computeScore();

console.log(`bowlingScore: ${bowlingScore}`);