// Define the exported methods
module.exports = {
	getTodayDate,
	getTodayDay
};

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