const playBtn = document.querySelector(".button__header");
const timeNum = document.querySelector(".timerNum");
const resumeBtn = document.querySelector(".button__resume");
const stopBtn = document.querySelector(".button__stop");
const optionScreenLayer = document.querySelector(".optionScreenLayer");

const totalTime = 10 * 1000;
let time = totalTime/1000; // 남은 시간
let count = 10; // 남은 당근 개수

let timer; 
let startTime;
let leftTime;

/**
 * @param {String} before icon class before
 * @param {string} after icon class after
 */

function changeButtonIcon (before, after) {
    const icon = playBtn.querySelector("i");
    if(icon.classList.contains(before)){
        // change
        icon.classList.remove(before);
        icon.classList.add(after);
    } else {
        throw Error("The icon doesn't have the class, before");
    }
}

function gameOver() { // 종료
    clearInterval(timer);
    console.log("game over");
    // icon change
    playBtn.classList.remove("started");
    changeButtonIcon("fa-pause", "fa-play");
    time = totalTime/1000;
    timeNum.innerHTML = `0:${time}`;
}

function handleStop() {
    gameOver();
    optionScreenLayer.style.zIndex = "-1";
}

function start() {
    startTime = new Date();
    console.log(startTime);
    
    timer = setInterval(() => { // button click 시 들어갈 코드 
        if(time <=0){
            gameOver();
        } else {
            time--;
            timeNum.innerHTML = `0:${time}`;
        }
    }, 1000);
    changeButtonIcon("fa-play", "fa-pause");
    playBtn.classList.add("started");
    
    console.log("Game started !");
}

function handleResume(){
    optionScreenLayer.style.zIndex = "-1";
    time = leftTime; // 막상 만들고 보니 pause타임이 없어도 되네..
    timer = setInterval(() => { // button click 시 들어갈 코드 
        if(time <=0){
            gameOver();
        } else {
            time--;
            timeNum.innerHTML = `0:${time}`;
        }
    }, 1000);

    console.log("resumed");
}

// function popup() {
//     optionScreenLayer.style.zIndex = "9";
// }

playBtn.addEventListener("click", () => {
    if(playBtn.classList.contains("started")){ // 처음 시작이 아닐때
        // 창 띄우기 : resume or stop(끝내기) 선택하는 창
        console.log("it's paused !");
        // 남은 시간 저장 필요
        clearInterval(timer);
        const timeNow = new Date();
        const passedTime = timeNow - startTime;
        leftTime = Math.ceil((totalTime-passedTime)/1000); // 뺄때 1초씩 빼기 때문에 올림(ceil)으로 해줌
        console.log(leftTime)
        
        optionScreenLayer.style.zIndex = "9"; // 선택창 popup
    } else { // 처음 시작할때 
        start();
    }
});


function init() {
    resumeBtn.addEventListener("click", handleResume);
    stopBtn.addEventListener("click", handleStop);
}

init();

