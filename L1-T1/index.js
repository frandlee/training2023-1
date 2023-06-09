const functions = require('@google-cloud/functions-framework');

// get methods from other files
const {getTodayDate, getTodayDay} = require('./tools.js');

functions.http('helloHttp', (req, res) => {
  // if name is not provided, set it as Guest
  let name;
  if (req.query.name) {
    name = req.query.name;
  } else {
    name = "Guest";
  }

  // Call methods to get date and day of today
  let todayDate = getTodayDate();
  let todayDay = getTodayDay();

  // Create message to send
  let msg = `Hello ${name}! \nToday is ${todayDate} and it is a ${todayDay}\n`;

  // Send message
  res.send(msg);
});
