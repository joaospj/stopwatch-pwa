const time = document.querySelector("#time");
const reset = document.querySelector("#reset");

let intervalId, startTime, split;
let totalTime = 0;
let isStarted = false;

document.body.addEventListener("click", function (evt) {
  // Do nothng if a svg or path is clicked, in this case the reset svg and path
  if (evt.path[0].localName !== "svg" && evt.path[0].localName !== "path") {
    if (!isStarted) {
      startTime = Date.now();
      start();
      isStarted = true;
      reset.style.display = "none";
    } else {
      pause();
      reset.style.display = "block";
      isStarted = false;
      totalTime += split;
    }
  }
});

reset.addEventListener("click", () => {
  totalTime = 0;
  time.innerHTML = "00:00.000";
});

const start = () => {
  intervalId = setInterval(() => {
    split = Date.now() - startTime;
    time.innerHTML = formatTime(totalTime + split);
  }, 1);
};

const pause = () => {
  clearInterval(intervalId);
};

const formatTime = (time) => {
  let sec = ((time / 1000) % 60).toFixed(3);
  let min = Math.floor(time / 60 / 1000);
  min = min > 10 ? min : `0${min}`;
  return sec > 10 ? `${min}:${sec}` : `${min}:0${sec}`;
};
