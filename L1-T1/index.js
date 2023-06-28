const functions = require('@google-cloud/functions-framework');

/**
 * Get today's date in the format YYYY-MM-DD
 * @returns 
 */
function getTodayDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0');
	const day = String(today.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}
  
  /**
   * Get today's day of the week
   * @returns 
   */
function getTodayDay() {
	const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const today = new Date();
	const dayIndex = today.getDay();
	return daysOfWeek[dayIndex];
}
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

