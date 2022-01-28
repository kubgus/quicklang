// Default Variables:
let pos = 0
let memory = []
// ------------------

// Read file (index.txt) and run
const fs = require('fs')
fs.readFile("index.txt", "utf8", (err, data) => {

    // Start at first character of code
    let char = -1;

    // Set default value to skip character
    let skip = false;

    // Runs forever
    let runtime = true;
    while (runtime) {

        // Move to next character in code
        char++;

        // Get value of character in code
        let ch = data.charAt(char);

        //
        // {char} means character position (0,1,2,3,...)
        // {ch} means character (>,<,...)
        //

        // Define position in memory
        if (!memory[pos]) {
            memory[pos] = 0;
        }

        // Disable skipping
        if (ch == ";") {
            skip = false;
        }
        // Skip character
        if (skip) {
            continue;
        }

        // < // Move backward
        /***/if (ch == "<") {
            pos -= 1;
        }
        // > // Move forward
        else if (ch == ">") {
            pos += 1;
        }
        // ] // Increase value of current position by 1
        else if (ch == "]") {
            memory[pos] += 1;
        }
        // [ //  Decrease value of current position by 1
        else if (ch == "[") {
            memory[pos] -= 1;
        }
        // $ // Read value of current position
        else if (ch == "$") {
            console.log(memory[pos]);
        }
        // # // Read current position
        else if (ch == "#") {
            console.log(pos);
        }
        // @ // Read whole memory
        else if (ch == "@") {
            var output = [];
            for (var i = 0; i <= memory.length; i++) {
                output.push(memory[i]);
            }
            console.log(output.join(", "))
        }
        // + //  Set value of current slot to sum of values of two slots before current slot
        else if (ch == "+") {
            memory[pos] = memory[pos - 1] + memory[pos - 2];
        }
        // - //  Set value of current slot to difference of values of two slots before current slot
        else if (ch == "-") {
            memory[pos] = memory[pos - 1] - memory[pos - 2];
        }
        // * //  Set value of current slot to product of values of two slots before current slot
        else if (ch == "*") {
            memory[pos] = memory[pos - 1] * memory[pos - 2];
        }
        // / //  Set value of current slot to quotient of values of two slots before current slot
        else if (ch == "/") {
            memory[pos] = memory[pos - 1] / memory[pos - 2];
        }
        // ? // Run all code before an assigned semi-colon (;) if value of current slot matches the value of the slot before
        else if (ch == "?") {
            if (memory[pos] != memory[pos - 1]) {
                skip = true;
            }
        }

    }

});