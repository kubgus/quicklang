// "example", "calculator", "invert"
const script = "invert";

//  _____                      _       _   _             
// |  __ \                    (_)     | | (_)            
// | |  | | ___  ___  ___ _ __ _ _ __ | |_ _  ___  _ __  
// | |  | |/ _ \/ __|/ __| '__| | '_ \| __| |/ _ \| '_ \ 
// | |__| |  __/\__ \ (__| |  | | |_) | |_| | (_) | | | |
// |_____/ \___||___/\___|_|  |_| .__/ \__|_|\___/|_| |_|
//                              | |                      
//                              |_|                      
//
// QL is a choice for anyone who just wants to quickly 
// learn a language and do some simple maths in an even simpler format.




//   _____          _      
//  / ____|        | |     
//  | |    ___   __| | ___ 
//  | |   / _ \ / _` |/ _ \
//  | |__| (_) | (_| |  __/
//  \_____\___/ \__,_|\___|
//
// Also contains some level of Documentation




// Default Variables:
let pos = 0
let memory = []
// ------------------

// Read file (index.txt) and run
const fs = require('fs')
fs.readFile(`scripts/${script}.txt`, "utf8", (err, data) => {

    // Start at first character of code
    let char = -1;

    // Set default value to skip character
    let skip = false;

    // Define data for loops
    let loops = [];

    // Runs forever
    let runtime = true;
    while (runtime) {

        // Move to next character in code
        char++;

        // Stop if all code was ran
        if (char > data.length) {
            runtime = false
            continue
        }

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

        // ; // End all loops and statements
        if (ch == ";") {

            // Disable skipping
            skip = false;

            // Repeat loop
            if (loops.length > 0) {
                let currentLoop = loops[loops.length - 1];
                if (currentLoop[1] > 1) {
                    char = currentLoop[0];
                    currentLoop[1]--;

                    ch = data.charAt(char);
                } else {
                    loops.pop();
                }
            }

        }
        // Skip character
        if (skip) {
            continue;
        }

        ///////////////////////////////////////////////

        // < // Move backward
        /***/if (ch == "<") {
            pos -= 1;
        }
        // > // Move forward
        else if (ch == ">") {
            pos += 1;
        }

        ///////////////////////////////////////////////

        // ] // Increase value of current position by 1
        else if (ch == "]") {
            memory[pos] += 1;
        }
        // [ //  Decrease value of current position by 1
        else if (ch == "[") {
            memory[pos] -= 1;
        }
        // ) // Increase value of current position by 10
        else if (ch == ")") {
            memory[pos] += 10;
        }
        // ( //  Decrease value of current position by 10
        else if (ch == "(") {
            memory[pos] -= 10;
        }
        // } // Increase value of current position by 100
        else if (ch == "}") {
            memory[pos] += 100;
        }
        // { //  Decrease value of current position by 100
        else if (ch == "{") {
            memory[pos] -= 100;
        }

        ///////////////////////////////////////////////

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
            console.log("| " + output.join(" | "));
        }

        ///////////////////////////////////////////////

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

        ///////////////////////////////////////////////

        // ? // Run all code before an assigned semi-colon (;) if value of current slot matches the value of the slot before
        // TODO: Make more if statements possible
        else if (ch == "?") {
            if (memory[pos] != memory[pos - 1]) {
                skip = true;
            }
        }
        // & // Run all code before an assigned semi-colon (;) value of current slot times
        else if (ch == "&") {
            loops.push([char + 1, memory[pos]]);

            if (memory[pos] == 0) {
                skip = true
            }
        }

        ///////////////////////////////////////////////

        // : // Set value of current position to value of position at value of current position
        else if (ch == ":") {
            memory[pos] = memory[memory[pos]];
        }

        ///////////////////////////////////////////////

    }

});






//===============================//
//                               //
//     __          ________      //
//    / /   ______/  _/ __ \     //
//   / /   / __  // // / / /     //
//  / /___/ /_/ // // /_/ /      //
// /_____/\_____\___/\___\_\     //
//                               //
//                               //
// (https://github.com/kubgus)   //
//===============================//