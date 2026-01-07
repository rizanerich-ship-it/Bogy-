// Cél: 2026-06-09 09:45 Europe/Budapest idő szerint.
// Megoldás: időzóna -> UTC millis pontos konverzió (DST-t is kezeli az adott zóna szabályai alapján).

function pad2(n) {
  return String(n).padStart(2, "0");
}

// Zoned date/time -> UTC millis (Intl alapú offset-számítással)
function zonedTimeToUtcMillis({ year, month, day, hour, minute, second }, timeZone) {
  // 1) induló becslés: mintha UTC lenne
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute, second);

  // 2) megállapítjuk, hogy a guess pillanatban a timeZone-ban "mi az idő"
  // és ebből kiszámoljuk az offsetet
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const parts = dtf.formatToParts(new Date(utcGuess));
  const get = (type) => Number(parts.find(p => p.type === type).value);

  const asZoned = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second")
  );

  // asZoned = utcGuess + offset  -> offset = asZoned - utcGuess
  const offset = asZoned - utcGuess;

  // 3) A "zónában megadott" időpont UTC-ben:
  return utcGuess - offset;
}

const TARGET_TZ = "Europe/Budapest";
const targetUtcMs = zonedTimeToUtcMillis({
  year: 2026,
  month: 6,
  day: 9,
  hour: 9,
  minute: 45,
  second: 0
}, TARGET_TZ);

const elDays = document.getElementById("days");
const elHours = document.getElementById("hours");
const elMinutes = document.getElementById("minutes");
const elSeconds = document.getElementById("seconds");

function render() {
  const now = Date.now();
  let diff = targetUtcMs - now;

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

render();
setInterval(render, 1000);
