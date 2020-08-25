const greeting = document.querySelector('.greeting');

const date = new Date();
const hour = date.getHours();
console.log(hour);
if (hour < 12) greeting.innerText = 'Good morning';
if (hour >= 12 && hour < 18) greeting.innerText = 'Good afternoon';
if (hour > 18) greeting.innerText = 'Good evening';
