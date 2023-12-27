// Get today's date
let today = new Date();
// Check if today is Saturday (day index 6)
if (today.getDay() === 6) {
    // If today is Saturday, lastSaturday will be the same as today
    var lastSaturday = today;
} else {
    // Calculate the difference in days between today and the last Saturday
    let dayOfWeek = today.getDay(); // 0 for Sunday, 6 for Saturday
    let daysToSubtract = (dayOfWeek + 1) // Calculate days to subtract for last Saturday
    var lastSaturday = new Date(today.getTime() - daysToSubtract * 24 * 60 * 60 * 1000);
}

// Formatting the date
const formattedLastSaturday = lastSaturday.toISOString().slice(0, 10); // Format last Saturday's date (YYYY-MM-DD)

console.log("Today's date:", formattedToday);
console.log("Last Saturday's date:", formattedLastSaturday);
