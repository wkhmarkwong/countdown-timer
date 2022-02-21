//Some note

//Take input. Only 0 <= input <= 60 is valid. Default value is 0

let seconds = Math.floor(
  window.prompt("Please enter countdown second (0-60): ")
);
let minutes = Math.floor(
  window.prompt("Please enter countdown minute (0-60): ")
);
let hours = Math.floor(window.prompt("Please enter countdown hour (0-60): "));

if (!(0 <= seconds && seconds <= 60)) {
  seconds = 0;
}

if (!(0 <= minutes && minutes <= 60)) {
  minutes = 0;
}

if (!(0 <= hours && hours <= 60)) {
  hours = 0;
}

//save original input
s_origin = seconds;
m_origin = minutes;
h_origin = hours;

//display value
let displaySeconds = seconds;
let displayMinutes = minutes;
let displayHours = hours;

let interval = null;

let watchStatus = "stopped";

var audio = new Audio("music.mp3");

document.getElementById("display").innerHTML = getDisplay();

//get display string
function getDisplay() {
  console.log(seconds, minutes, hours);

  if (seconds < 10) {
    displaySeconds = "0" + seconds;
  } else {
    displaySeconds = seconds;
  }

  if (minutes < 10) {
    displayMinutes = "0" + minutes;
  } else {
    displayMinutes = minutes;
  }

  if (hours < 10) {
    displayHours = "0" + hours;
  } else {
    displayHours = hours;
  }

  return displayHours + ":" + displayMinutes + ":" + displaySeconds;
}

function stopWatch() {
  //number logic

  if (seconds === 0 && minutes === 0 && hours === 0) {
    watchStatus = "end";
    startStop();
    seconds++; //offset the second-- below to prevent minus value display
  }
  seconds--;

  if (seconds < 0) {
    minutes--;
    seconds = 59;
  }

  if (minutes < 0) {
    hours--;
    minutes = 59;
  }

  document.getElementById("display").innerHTML = getDisplay();
}

//reset the countdown time to user's original input
function reset() {
  window.clearInterval(interval);
  seconds = s_origin;
  minutes = m_origin;
  hours = h_origin;
  audio.pause();

  watchStatus = "stopped";
  document.getElementById("display").innerHTML = getDisplay();
  document.getElementById("control").innerHTML = "Start";
}

// start/stop the watch when button "control" is clicked. Play music when countdown has finished
function startStop() {
  audio.pause();

  if (watchStatus === "stopped") {
    interval = window.setInterval(stopWatch, 1000);
    document.getElementById("control").innerHTML = "Stop";
    watchStatus = "started";
  } else if (watchStatus === "end") {
    window.clearInterval(interval);
    watchStatus = "ended"; //stop loop
    ring();
  } else if (watchStatus === "started") {
    window.clearInterval(interval);
    document.getElementById("control").innerHTML = "Start";
    watchStatus = "stopped";
  }
}

//play music
function ring() {
  audio.currentTime = 0;
  audio.play();
}
