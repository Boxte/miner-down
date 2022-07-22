/**
 * Run this file to test handler locally on my machine.
 */
let handler = require("./index.js");

handler
  .handler(
    {}, // event
    {}, // context
    (error, result) => {
      if (error) {
        console.error(JSON.stringify(error, null, 2));
      } else {
        console.log(JSON.stringify(result, null, 2));
      }
    }
  )
  .then(console.log)
  .catch((error) => console.log(error));
