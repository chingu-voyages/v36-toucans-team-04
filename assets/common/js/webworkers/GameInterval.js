// Store the interval IDs
const intervals = [];

/**
 * Called when GameController posts a message to this worker.
 * @param {*} e first item is the action (START or STOP),
 *      second item is interval type (Word generation, difficulty level, or Frame)
 *      third item is the timeframe in miliseconds
 */
onmessage = function(e) {
    let action = e.data[0];
    let type = e.data[1];
    let time = e.data[2];

    // Start the interval for the provided type
    if(action == "START") {
        intervals[type] = setInterval(() => {
            // Send message back to the Game Controller
            this.postMessage(type);
        }, time);
    }

    // Stop the interval for the provided type
    if(action == "STOP") {
        clearInterval(intervals[type]);
    }
}