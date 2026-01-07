function pad2(n){ return String(n).padStart(2,"0"); }

// Biztos Budapest idő: 2026-06-09 09:45 CEST (+02:00)
const target = new Date("2026-06-09T09:45:00+02:00").getTime();

const elDays = document.getElementById("days");
const elHours = document.getElementById("hours");
const elMinutes = document.getElementById("minutes");
const elSeconds = document.getElementById("seconds");

function tick(){
  const now = Date.now();
  let diff = target - now;
  if (diff < 0) diff = 0;

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  elDays.textContent = String(days);
  elHours.textContent = pad2(hours);
  elMinutes.textContent = pad2(minutes);
  elSeconds.textContent = pad2(seconds);
}

tick();
setInterval(tick, 1000);
