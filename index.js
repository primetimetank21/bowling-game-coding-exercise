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
function frameMaker(points = 0, throws = 0) {

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

        // console.log(`Slash length: ${slashIndexes.length}`);

        // Start computing score
        for (let j = 0; j < slashIndexes.length; j++) {
            var tmpSum = 0;
            var tmpThrows = 0;
            if (slashIndexes[j] === slashIndexes[slashIndexes.length - 1]) {        // Compute til end of string
                for (let k = slashIndexes[j] + 1; k < scorecard.length; k++) {
                    // console.log(scorecard.charAt(k))
                    // check for 'X', '/', or number
                    if (scorecard.charAt(k).toUpperCase() === 'X') {
                        //create scoreFrame with score of 10, throws of 2
                        // frameArray.forEach(frame => {
                        //     if (frame.extraThrows > 0) {
                        //         frame.score += tmpSum;
                        //         frame.extraThrows--;
                        //     }
                        // });
                        tmpSum = 10;
                        tmpThrows = 2;
                    } else if (scorecard.charAt(k) === '/') {
                        //create scoreFrame with score of 10, throws of 1
                        frameArray.forEach(frame => {
                            if (frame.extraThrows > 0) {
                                frame.score += tmpSum;
                                frame.extraThrows--;
                            }
                        });

                        tmpSum = 10;
                        tmpThrows = 0;
                    } else {
                        tmpSum += Number(scorecard.charAt(k));
                        tmpThrows = 0;
                    }

                    frameArray.forEach(frame => {
                        if (frame.extraThrows > 0) {
                            frame.score += tmpSum;
                            frame.extraThrows--;
                        }
                    });

                }


                // NEED to create special case for last frame

                // Create scoreFrame object
                let newFrame = frameMaker(tmpSum, tmpThrows);
                frameArray.push(newFrame);

                // Checks for throws && increments previous frame scores if > 0
                frameArray.forEach(frame => {
                    if (frame.extraThrows > 0) {
                        frame.score += tmpSum;
                        frame.extraThrows--;
                    }
                });
            } else {        // Compute until the next index
                for (let k = slashIndexes[j] + 1; k < slashIndexes[j + 1]; k++) {
                    // console.log(scorecard.charAt(k))

                    //check for 'X', '/', or number
                    if (scorecard.charAt(k).toUpperCase() === 'X') {
                        //create frameObj with score of 10, throws of 2
                        tmpSum = 10;
                        tmpThrows = 2;
                    } else if (scorecard.charAt(k) === '/') {
                        //create frameObj with score of 10, throws of 1
                        frameArray.forEach(frame => {
                            if (frame.extraThrows > 0) {
                                frame.score += tmpSum;
                                frame.extraThrows--;
                            }
                        });
                        tmpSum = 10;
                        tmpThrows = 1;
                    } else {
                        tmpSum += Number(scorecard.charAt(k));
                        tmpThrows = 0;
                    }

                    // frameArray.forEach(frame => {
                    //     if (frame.extraThrows > 0) {
                    //         frame.score += tmpSum;
                    //         frame.extraThrows--;
                    //     }
                    // });

                }



                // Create scoreFrame object
                let newFrame = frameMaker(tmpSum, tmpThrows);
                frameArray.push(newFrame);

                // Checks for throws && increments previous frame scores if > 0
                frameArray.forEach(frame => {
                    if (frame !== frameArray[j] && frame.extraThrows > 0) {
                        frame.score += tmpSum;
                        frame.extraThrows--;
                    }
                });

            }

        }

        // Checks last 2 frames' extra throws
        if (frameArray[frameArray.length - 1].extraThrows > 0 || frameArray[frameArray.length - 2].extraThrows > 0) {
            while (frameArray[frameArray.length - 1].extraThrows !== 0) {
                frameArray[frameArray.length - 1].score += tmpSum;
                frameArray[frameArray.length - 1].extraThrows--;
            }
            while (frameArray[frameArray.length - 2].extraThrows !== 0) {
                frameArray[frameArray.length - 2].score += tmpSum;
                frameArray[frameArray.length - 2].extraThrows--;
            }
        }


        // console.log(`frameArray: ${frameArray.length}`);
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